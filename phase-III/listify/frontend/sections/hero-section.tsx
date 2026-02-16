import AnimatedContent from "@/components/animated-content";
import CustomIcon from "@/components/custom-icon";
import { SparkleIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from '@/db';
import { user } from '@/db/schema';
import { sql, and, not, ilike } from 'drizzle-orm';

// Default fallback images
const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
];

async function getRandomUserImages() {
    try {
        // Fetch 2 random users who have locally uploaded profile images
        // Exclude OAuth images (Google, GitHub) to avoid rate limiting
        const randomUsers = await db
            .select({ image: user.image })
            .from(user)
            .where(
                and(
                    sql`${user.image} IS NOT NULL`,
                    not(ilike(user.image, '%googleusercontent.com%')),
                    not(ilike(user.image, '%githubusercontent.com%')),
                    not(ilike(user.image, '%github.com%'))
                )
            )
            .orderBy(sql`RANDOM()`)
            .limit(2);

        const userImages = randomUsers?.map((u) => u.image).filter((img): img is string => !!img) || [];

        // If we have user images, use them; otherwise use defaults
        if (userImages.length >= 2) {
            return userImages.slice(0, 2);
        } else if (userImages.length === 1) {
            return [userImages[0], DEFAULT_IMAGES[1]];
        }

        return DEFAULT_IMAGES;
    } catch (error) {
        console.error('Error fetching user images:', error);
        return DEFAULT_IMAGES;
    }
}

export default async function HeroSection() {
    const userImages = await getRandomUserImages();

    return (
        <section className="bg-[url('/assets/hero-gradient-bg.png')] bg-cover bg-center bg-no-repeat px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-screen">
                <AnimatedContent reverse distance={30} className="flex items-center gap-2 bg-white/50 backdrop-blur p-1 rounded-full">
                    <div className="flex items-center -space-x-3">
                        <img className="size-7 rounded-full border-2 border-white"
                            src={userImages[0]}
                            alt="User 1" />
                        <img className="size-7 rounded-full border-2 border-white"
                            src={userImages[1]}
                            alt="User 2" />
                    </div>
                    <span>5K+</span>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <span>Tasks organized</span>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <div className="flex items-center gap-1 pr-3">
                        <StarIcon className="size-4.5 fill-orange-500 stroke-orange-500" />
                        <span>4.8</span>
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.1} className="relative">
                    <h1 className="text-center font-urbanist text-5xl/15 md:text-6xl/18 mt-4 font-bold max-w-2xl">
                        Organize your tasks. Simplify your life.
                    </h1>
                    <div className="absolute -top-5 right-13 hidden md:block">
                        <CustomIcon icon={SparkleIcon} dir="right" />
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.2}>
                    <p className="text-center text-base/7 text-zinc-500 max-w-lg mt-4">
                        Create, manage, and complete your daily tasks with a fast, secure, and beautifully designed Todo app built for productivity.
                    </p>
                </AnimatedContent>
                <AnimatedContent className="flex flex-col md:flex-row items-center gap-4 mt-6 w-full md:w-auto">
                    <Link href="/login" className="py-3 md:py-2.5 w-full md:w-auto px-8 border border-orange-200 bg-linear-to-tl from-orange-600 to-orange-500 text-white text-center rounded-full">
                        Get Started
                    </Link>
                    <Link href="/" className="relative py-3 md:py-2.5 w-full md:w-auto px-8 bg-white/50 text-gray-600 font-medium text-center border border-white rounded-full">
                        Watch Demo
                        <AnimatedContent direction="horizontal" className="absolute size-8 pointer-events-none right-0 top-full -translate-y-1/2">
                            <Image
                                src="/assets/mouse-arrow.svg"
                                alt="mouse-arrow"
                                width={24}
                                height={24}
                            />
                        </AnimatedContent>
                    </Link>
                </AnimatedContent>
            </div>
        </section>
    );
}