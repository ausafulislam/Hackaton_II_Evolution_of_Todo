import { InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import AnimatedContent from "./animated-content";

export default function Footer() {
    return (
        <footer className="px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="border-x border-gray-200 px-4 md:px-12 max-w-7xl mx-auto pt-40">
                <div className="flex flex-col md:flex-row items-start justify-between relative p-8 md:p-12 overflow-hidden pb-16 md:pb-20 bg-gradient-to-t from-orange-50 to-orange-100 rounded-t-2xl">
                    <Image
                        src="/assets/logo-colored.svg"
                        alt="Listify Logo"
                        width={135}
                        height={35}
                        className="h-62 w-auto absolute -bottom-18 opacity-7 select-none pointer-events-none"
                    />
                    <AnimatedContent distance={40} className="max-w-72">
                        <Image
                            src="/assets/logo-colored.svg"
                            alt="Listify Logo"
                            width={135}
                            height={35}
                            className="h-9"
                        />
                        <p className="text-zinc-500 mt-4 pb-6">Organize your tasks, boost your productivity with Listify</p>
                    </AnimatedContent>
                    <div>
                        <p className="uppercase font-semibold text-orange-600 text-base">Social</p>
                        <AnimatedContent className="flex flex-col mt-6 gap-3">
                            <a
                                href="https://x.com/ausafulislam_h"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                <TwitterIcon size={20} />
                                <p>Twitter</p>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ausafulislam/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                <LinkedinIcon size={20} />
                                <p>LinkedIn</p>
                            </a>
                            <a
                                href="https://www.instagram.com/h_ausafulislam/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                <InstagramIcon size={20} />
                                <p>Instagram</p>
                            </a>
                        </AnimatedContent>
                    </div>
                </div>
                <div className="border-x border-b border-gray-200 py-6 px-8 bg-white rounded-b-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} Listify. All rights reserved.</p>
                        <p className="flex items-center gap-1">
                            Made with <span className="text-red-500">❤</span> by
                            <a
                                href="https://www.linkedin.com/in/ausafulislam/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors ml-1"
                            >
                                Ausaf ul Islam
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}