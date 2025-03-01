function CircleFillIcon({ className, width, height, fill = true, ...props }: any) {
    return (
        <div
            className={`absolute ${className} ${
                fill ? "bg-primary" : "bg-[#ffe6db] dark:bg-[#ffe6db]/10"
            } rounded-full`}
            style={{ width: `${width}px`, height: `${height}px` }}
            {...props}
        ></div>
    );
}

export default CircleFillIcon;
