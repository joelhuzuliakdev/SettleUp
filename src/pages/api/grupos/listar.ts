import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const GET: APIRoute = async ({ cookies }) => {
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
        return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
        });
    }

    const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
        });
    }

    try {
        // Traer grupos donde el usuario es participante
        const { data: grupos, error } = await supabase
        .from("grupos")
        .select(`
            *,
            participantes(count),
            gastos(count)
        `)
        .order("created_at", { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify({ grupos }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("Error listando grupos:", e);
        return new Response(JSON.stringify({ error: "Error al obtener grupos" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
};