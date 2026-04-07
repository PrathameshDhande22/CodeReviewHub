"use client";

import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-gray-300">Loading user...</div>;
  }

  if (!session?.user) {
    return <div className="text-gray-300">You are not signed in.</div>;
  }

  return (
    <div className="space-y-4 text-gray-200">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="rounded-xl border border-neutral-700 bg-slate-950/70 p-6 space-y-3">
        <div>
          <span className="font-semibold">Name:</span>{" "}
          {session.user.name ?? "No name provided"}
        </div>
        <div>
          <span className="font-semibold">Email:</span>{" "}
          {session.user.email ?? "No email provided"}
        </div>
        <div>
          <span className="font-semibold">Image:</span>{" "}
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name ?? "User avatar"}
              className="inline-block h-12 w-12 rounded-full"
            />
          ) : (
            "No avatar"
          )}
        </div>
      </div>
      <pre className="rounded-lg bg-slate-900/80 p-4 text-sm text-slate-300">
        {JSON.stringify(session.user, null, 2)}
      </pre>
    </div>
  );
};

export default UserProfile;
