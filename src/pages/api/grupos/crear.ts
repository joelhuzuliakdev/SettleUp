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

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const body = await request.json();
        const { nombre } = body;

        if (!nombre?.trim()) {
        return new Response(JSON.stringify({ error: "El nombre es requerido" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
        }

        // Crear el grupo
        const { data: grupo, error: grupoError } = await supabase
        .from("grupos")
        .insert({ nombre: nombre.trim(), creado_por: user.id })
        .select()
        .single();

        if (grupoError) throw grupoError;

        // Agregar al creador como participante automáticamente
        const { error: participanteError } = await supabase
        .from("participantes")
        .insert({ grupo_id: grupo.id, user_id: user.id });

        if (participanteError) throw participanteError;

        return new Response(JSON.stringify({ grupo }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("Error creando grupo:", e);
        return new Response(JSON.stringify({ error: "Error al crear el grupo" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
};