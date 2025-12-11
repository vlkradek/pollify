"use client"


const Loading = ({
    size = 25,
    thickness = 3,
    color = "#ffffff",
    className = ""
}: {
    size?: number;
    thickness?:number;
    color?:string;
    className?: string;
}) => {
    return (
        <div className="loader-container">
            <div className={`loader ${className}`}></div>

            <style jsx>{`
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .loader {
                    border: ${thickness}px solid transparent;
                    border-top: ${thickness}px solid ${color};
                    border-radius: 50%;
                    width: ${size}px;
                    height: ${size}px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;
