// src/pages/api/auth/callback.ts
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const code = url.searchParams.get("code");

    if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.session) {
        cookies.set("sb-access-token", data.session.access_token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 días
        });

        cookies.set("sb-refresh-token", data.session.refresh_token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 días
        });

        return redirect("/dashboard");
        }
    }

    return redirect("/login");
};