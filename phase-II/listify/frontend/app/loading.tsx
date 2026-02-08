export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-orange-500 ml-3"></div>
                <p className="m-2 text-muted-foreground">Loading...</p>
            </div>
        </div>
    )
}
