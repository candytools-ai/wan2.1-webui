import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { IGeneration, usePrediction } from "@/hooks/use-fal";
import { DEFAULT_MODEL, Model, models } from "@/config/models-video";

interface IParams {
    [key: string]: any;
}

export interface ICreation {
    prompt: string;
    imageSrc: string;
    model: Model;
    ratios: any[];
    durations: any[];
    quailtys: any[];
    styles: any[];
    speeds: any[];
    privateMode: boolean;
    cost: number;
    generation: IGeneration;
    handlePrompt: any;
    handleImageSrcChange: any;
    handleRatioChange: any;
    handleDurationChange: any;
    handleQuailtyChange: any;
    handleStyleChange: any;
    handleSpeedChange: any;
    handleModelChange: any;
    handlePrivateModeChange: any;
    handleSubmit: any;
    getModelAPI: any;
}

export interface IPayload {
    prompt: string | null;
    modelId: string | null;
    aspectRatio: string | null;
    duration: string | null;
    mode: string | null; // generationMode
    quailty: string | null;
    styleId: string | null;
    imageSrc: string | null;
}

const deepCopy = (source: IParams[]) => {
    return source.map((item: IParams) => ({ ...item }));
};

const getDuration = (times: any) => {
    return times.find((item: any) => item.selected)?.value || "5";
};

const getResolution = (resolutions: any) => {
    return resolutions.find((item: any) => item.selected)?.value || "480p";
};

const getSpeed = (speeds: any) => {
    return speeds.find((item: any) => item.selected)?.value || "normal";
};

const getCost = (model: Model, { durations, speeds, resolutions }: any) => {
    return model.credits[
        `${getSpeed(speeds)}_${getDuration(durations)}_${getResolution(
            resolutions
        )}`
    ];
};

export function useCreation(pathname: string, payload: IPayload) {
    const fromImage = pathname.includes(
        "/create/video/image-to-video"
    );
    const [prompt, setPrompt] = useState(payload.prompt || "");
    const [model, setModel] = useState<Model>(
        (payload.modelId &&
            models.find((model) => model.id === payload.modelId)) ||
            DEFAULT_MODEL
    );
    const [imageSrc, setImageSrc] = useState(payload.imageSrc || "");
    const [ratios, setRatios] = useState(deepCopy(model.ratios));
    const [durations, setDurations] = useState(deepCopy(model.times));
    const [quailtys, setQuailtys] = useState(deepCopy(model.resolutions));
    const [styles, setStyles] = useState(deepCopy(model.styles));
    const [speeds, setSpeeds] = useState(deepCopy(model.speed));
    const [privateMode, setPrivateMode] = useState(false);
    const [cost, setCost] = useState(
        getCost(model, {
            durations: model.times,
            speeds: model.speed,
            resolutions: model.resolutions,
        })
    );
    const { data: session } = useSession();
    const user: any = session?.user;
    const {
        generation,
        handleSubmit,
    }: { generation: IGeneration; handleSubmit: any } = usePrediction(user);

    const getModelAPI = (pathname: string) => {
        const image_to_video = pathname.includes(
            "/create/video/image-to-video"
        );
        const speed =
            speeds.find((item: any) => item.selected)?.value || "normal";

        if (image_to_video) {
            return model.api.image_to_video[speed];
        } else {
            return model.api.text_to_video[speed];
        }
    };

    const handlePrompt = (desc: string) => {
        setPrompt(desc);
    };
    const handleImageSrcChange = (url: string) => {
        setImageSrc(url);
    };
    function handleModelChange(model: Model) {
        setModel(model);
        setRatios(deepCopy(model.ratios));
        setDurations(deepCopy(model.times));
        setQuailtys(deepCopy(model.resolutions));
        setStyles(deepCopy(model.styles));
        setSpeeds(deepCopy(model.speed));
        setCost(
            getCost(model, {
                durations: model.times,
                speeds: model.speed,
                resolutions: model.resolutions,
            })
        );
    }
    const handleRatioChange = (value: string) => {
        const newRatios = ratios.map((item) => {
            if (item.value === value) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });

        setRatios(newRatios);
    };
    const handleDurationChange = (value: string) => {
        const newDurations = durations.map((item) => {
            if (item.value === value) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });

        setCost(
            getCost(model, {
                durations: newDurations,
                speeds,
                resolutions: quailtys,
            })
        );

        setDurations(newDurations);
    };
    const handleQuailtyChange = (value: string) => {
        const newQuailtys = quailtys.map((item) => {
            if (item.value === value) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });

        setCost(
            getCost(model, {
                durations,
                speeds,
                resolutions: newQuailtys,
            })
        );

        setQuailtys(newQuailtys);
    };
    const handleStyleChange = (value: string) => {
        const newStyles = styles.map((item) => {
            if (item.value === value) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });

        console.info(newStyles);

        setStyles(newStyles);
    };
    const handleSpeedChange = (value: string) => {
        const newSpeeds = speeds.map((item) => {
            if (item.value === value) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });

        setCost(
            getCost(model, {
                durations,
                speeds: newSpeeds,
                resolutions: quailtys,
            })
        );

        setSpeeds(newSpeeds);
    };
    const handlePrivateModeChange = (mode: boolean) => {
        setPrivateMode(mode);
    };

    return {
        prompt,
        imageSrc,
        model,
        ratios,
        durations,
        quailtys,
        styles,
        speeds,
        privateMode,
        cost,
        generation,

        handlePrompt,
        handleImageSrcChange,
        handleModelChange,
        handleRatioChange,
        handleDurationChange,
        handleQuailtyChange,
        handleStyleChange,
        handleSpeedChange,
        handlePrivateModeChange,
        handleSubmit,

        getModelAPI,
    };
}
