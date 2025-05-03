"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-800/60 backdrop-blur-lg shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white placeholder-gray-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white placeholder-gray-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-100 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have one?"}{" "}
          <button
            className="text-blue-400 underline hover:text-blue-300 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
