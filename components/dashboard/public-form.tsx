import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { ModalContext } from "@/components/modals/providers";
import { Switch } from "@/components/ui/switch";
import { PremiumTooltip } from "@/components/ui/premium-tooltip";
import { FormHeader } from "@/components/dashboard/form-header";

interface FormParams {
    title: string;
    tips?: string;
    premiumTips?: string;
    privateMode: boolean;
    handlePrivateModeChange: any;
}

export function PrivateModeForm({
    title,
    tips,
    premiumTips,
    privateMode,
    handlePrivateModeChange,
}: FormParams) {
    const { data: session } = useSession();
    const user: any = session?.user;
    const { setShowSignInModal } = useContext(ModalContext);

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <div className="flex items-center gap-2 relative">
                    {premiumTips && (
                        <PremiumTooltip>{premiumTips}</PremiumTooltip>
                    )}
                    <Switch
                        checked={privateMode}
                        onCheckedChange={handlePrivateModeChange}
                        disabled={!user?.subscribed}
                        // aria-readonly
                    />
                </div>
            </div>
        </>
    );
}
