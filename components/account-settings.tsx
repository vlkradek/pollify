"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { UserFullType } from "@/lib/schemas";
import { toast } from "sonner";

interface UserPoll {
    id: number;
    title: string;
    votes: number;
}

export default function AccountSettings({ user }: { user: UserFullType }) {
    const [pollsActive, setPollsActive] = useState<Record<number, boolean>>(
        user.polls.reduce(
            (acc, poll) => ({ ...acc, [poll.id]: poll.isActive }),
            {}
        )
    );

    const handleDeletePoll = async (pollId: number) => {
        try {
            const response = await fetch(`/api/polls/${pollId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Error deleting poll");
            }
        } catch (error) {
            console.error("Error deleting poll:", error);
        }
    };

    const handleTogglePollActive = async (pollId: number) => {
        const newActiveState = !pollsActive[pollId];

        // Optimistic update
        setPollsActive((prev) => ({ ...prev, [pollId]: newActiveState }));

        try {
            const response = await fetch(`/api/polls/${pollId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newActiveState }),
            });

            if (!response.ok) {
                // Revert on error
                setPollsActive((prev) => ({
                    ...prev,
                    [pollId]: !newActiveState,
                }));
                console.error("Error updating poll status");
            } else {
              toast.success(
                `Anketa byla nyní ${newActiveState ? "aktivována" : "deaktivována"}.`
              )
            }
        } catch (error) {
            // Revert on error
            setPollsActive((prev) => ({ ...prev, [pollId]: !newActiveState }));
            console.error("Error updating poll status:", error);
        }

        // Mock behavior for now
        console.log(
            `Poll ${pollId} is now ${newActiveState ? "active" : "inactive"}`
        );
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Jste si jisti, že chcete smazat svůj účet? Tuto akci nelze vrátit."
        );

        if (!confirmed) return;

        try {
            const response = await fetch("/api/user", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                await signOut({
                    callbackUrl: "/", // 👈 redirect after delete
                });
            } else {
                console.error("Error deleting account:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 font-sans text-3xl font-bold text-foreground">
                            Nastavení účtu
                        </h1>
                        <p className="text-muted-foreground">
                            Spravujte svůj své ankety
                        </p>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="flex h-10 items-center gap-2 rounded-lg border cursor-pointer border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Odhlásit se
                    </button>
                </div>
                <div className="space-y-6">
                    {/* Profile Information */}
                    {/* <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-sans text-xl font-semibold text-card-foreground">Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <button
                type="submit"
                className="h-10 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </button>
            </form>
          </div> */}

                    {/* Change Password */}
                    {/* <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-sans text-xl font-semibold text-card-foreground">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-foreground">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-foreground">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-foreground">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="h-10 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Update Password
              </button>
            </form>
          </div> */}

                    {/* My Polls */}
                    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-sans text-xl font-semibold text-card-foreground">
                                Moje ankety
                            </h2>
                            <Link
                                href="/account/create-poll"
                                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                Vytvořit anketu
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {user.polls.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Ještě jste nevytvořili žádné ankety.
                                </p>
                            )}
                            {user.polls.map((poll) => (
                                <div
                                    key={poll.id}
                                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">
                                            {poll.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {poll.votes.length} hlasů
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">
                                                {pollsActive[poll.id]
                                                    ? "Aktivní"
                                                    : "Neaktivní"}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleTogglePollActive(
                                                        poll.id
                                                    )
                                                }
                                                role="switch"
                                                aria-checked={
                                                    pollsActive[poll.id]
                                                }
                                                className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                                    pollsActive[poll.id]
                                                        ? "bg-primary"
                                                        : "bg-input"
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        pollsActive[poll.id]
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                        <Link
                                            href={`/polls/${poll.id}`}
                                            className="inline-flex h-8 items-center justify-center rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-accent"
                                        >
                                            Zobrazit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeletePoll(poll.id)
                                            }
                                            className="inline-flex h-8 cursor-pointer w-8 items-center justify-center rounded-lg border border-destructive/50 bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                            aria-label="Smazat hlasování"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                <line
                                                    x1="10"
                                                    y1="11"
                                                    x2="10"
                                                    y2="17"
                                                />
                                                <line
                                                    x1="14"
                                                    y1="11"
                                                    x2="14"
                                                    y2="17"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="rounded-lg border border-destructive/50 bg-card p-6 shadow-sm">
                        <h2 className="mb-2 font-sans text-xl font-semibold text-destructive">
                            Smazat účet
                        </h2>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Jakmile svůj účet smažete, není cesty zpět. Buďte si
                            prosím jisti.
                        </p>
                        <button
                            onClick={handleDelete}
                            className="h-10 rounded-lg cursor-pointer border border-destructive bg-destructive/10 px-6 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                            Smazat účet
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
