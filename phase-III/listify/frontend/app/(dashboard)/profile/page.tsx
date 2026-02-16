import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            <ProfileClient user={session.user} />
        </div>
    );
}
