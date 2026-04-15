export const es = {
    // General
    app_name: "DividirGastos",
    loading: "Cargando...",
    error: "Ocurrió un error",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    back: "Volver",
    confirm: "Confirmar",

    // Auth
    auth: {
        login: "Iniciar sesión",
        register: "Registrarse",
        logout: "Cerrar sesión",
        email: "Correo electrónico",
        password: "Contraseña",
        name: "Nombre",
        no_account: "¿No tenés cuenta?",
        have_account: "¿Ya tenés cuenta?",
        login_error: "Email o contraseña incorrectos",
        register_error: "Error al registrarse",
    },

    // Grupos
    groups: {
        title: "Mis Grupos",
        new: "Nuevo Grupo",
        create: "Crear Grupo",
        name: "Nombre del grupo",
        name_placeholder: "Ej: Viaje a Bariloche",
        empty: "No tenés grupos todavía",
        empty_hint: "Creá uno para empezar a dividir gastos",
        members: "Participantes",
        add_member: "Agregar participante",
        member_email: "Email del participante",
    },

    // Gastos
    expenses: {
        title: "Gastos",
        new: "Nuevo Gasto",
        add: "Agregar Gasto",
        description: "Descripción",
        description_placeholder: "Ej: Cena en restaurante",
        amount: "Monto",
        paid_by: "Pagó",
        split_between: "Dividir entre",
        empty: "No hay gastos en este grupo",
        empty_hint: "Agregá el primer gasto",
    },

    // Balances
    balances: {
        title: "Balances",
        you_owe: "Debés",
        owes_you: "Te deben",
        settled: "¡Todo saldado!",
        settled_hint: "No hay deudas pendientes en este grupo",
        to: "a",
    },
} as const;