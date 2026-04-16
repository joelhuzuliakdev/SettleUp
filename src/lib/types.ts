export interface Perfil {
    id: string;
    nombre: string;
    email: string;
    created_at: string;
}

export interface Grupo {
    id: string;
    nombre: string;
    creado_por: string;
    created_at: string;
}

export interface Participante {
    id: string;
    grupo_id: string;
    user_id: string;
    created_at: string;
    // Relación: datos del perfil del participante
    perfiles?: Perfil;
}

export interface Gasto {
    id: string;
    grupo_id: string;
    pagador_id: string;
    monto: number;
    descripcion: string;
    created_at: string;
    // Relaciones
    perfiles?: Perfil;
    gasto_participantes?: GastoParticipante[];
}

export interface GastoParticipante {
    id: string;
    gasto_id: string;
    user_id: string;
    monto_individual: number;
    // Relación
    perfiles?: Perfil;
}

// Para calcular balances
export interface Balance {
    user_id: string;
    nombre: string;
    monto: number; // positivo = te deben, negativo = debés
}

export interface Deuda {
    deudor_id: string;
    deudor_nombre: string;
    acreedor_id: string;
    acreedor_nombre: string;
    monto: number;
}