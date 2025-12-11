
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";

export default async function LoginPage() {
    const session = await auth();

    if (session) {
        redirect("/account");
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 font-sans text-2xl font-bold text-card-foreground">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in with your Google account to continue
                        </p>
                    </div>
                    <LoginForm/>

                </div>
            </div>
        </main>
    );
}
