import { Spinner } from "@heroui/react";
import Image from "next/image";
import logo from "@/component/assets/images/image.png";

const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#EEF2FF_0%,#E8EFFE_100%)]">
            <div className="flex flex-col items-center gap-5">

                <Image
                    src={logo}
                    alt="BookSphere"
                    width={170}
                    height={170}
                    className="animate-pulse"
                />

                <Spinner
                    size="lg"
                    color="primary"
                />

                <p className="text-[#0A1F5C] font-medium">
                    Loading BookSphere...
                </p>

            </div>
        </div>
    );
};

export default Loading;

