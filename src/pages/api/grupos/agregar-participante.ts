import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies }) => {
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

    try {
        const { grupo_id, email } = await request.json();

        if (!grupo_id || !email) {
        return new Response(JSON.stringify({ error: "Datos incompletos" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
        }

        // Buscar el perfil por email
        const { data: perfil, error: perfilError } = await supabase
        .from("perfiles")
        .select("id, nombre, email")
        .eq("email", email)
        .single();

        if (perfilError || !perfil) {
        return new Response(
            JSON.stringify({ error: "No se encontró un usuario con ese email" }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
        }

        // Agregar como participante
        const { error: participanteError } = await supabase
        .from("participantes")
        .insert({ grupo_id, user_id: perfil.id });

        if (participanteError) {
        if (participanteError.code === "23505") {
            return new Response(
            JSON.stringify({ error: "Este usuario ya es participante del grupo" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        throw participanteError;
        }

        return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("Error agregando participante:", e);
        return new Response(JSON.stringify({ error: "Error interno" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
};