import Navbar from "@/components/navbar";
import LenisScroll from "@/components/lenis";
import Footer from "@/components/footer";

import { PublicLayoutProps } from '@/types'


export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>
            <LenisScroll />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}