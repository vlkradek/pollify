
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Přihlásit se | Pollify",
}

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
                            Přihlásit se do Pollify
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Přihlaste se pomocí svého Google účtu, abyste mohli pokračovat
                        </p>
                    </div>
                    <LoginForm/>
                </div>
            </div>
        </main>
    );
}
