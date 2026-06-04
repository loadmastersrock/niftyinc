"use client";

import { loginAdmin } from "@/app/admin/actions";
import { useState } from "react";

export default function AdminLogin() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await loginAdmin(formData);

    if (result.success) {
      window.location.reload();
      return;
    }

    setMessage(result.message);
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-violet-400">
          Nifty Admin
        </p>

        <h1 className="mb-6 text-4xl font-black">Admin Login</h1>

        <form action={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="Enter admin password"
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
          />

          <button className="w-full rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-500">
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-red-300">{message}</p>}
      </div>
    </main>
  );
}