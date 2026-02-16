import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center text-sm max-md:px-4 bg-background">
                <h1 className="text-8xl md:text-9xl font-bold text-orange-500">404</h1>
                <div className="h-1 w-16 rounded bg-orange-500 my-5 md:my-7"></div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">Oops! Page Not Found</p>
                <p className="text-sm md:text-base mt-4 text-muted-foreground max-w-md text-center">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist on our website.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Link
                        href="/"
                        className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all text-center"
                    >
                        Back to Homepage
                    </Link>
                    <Link
                        href="/contact"
                        className="border border-orange-300 bg-background px-7 py-2.5 text-foreground rounded-md active:scale-95 transition-all text-center"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}