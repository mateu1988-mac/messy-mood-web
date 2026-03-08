import { supabase } from '../config/supabase';

// Lee de las variables de entorno, por defecto usará 'baserow' si no se especifica
const DB_MODE = import.meta.env.VITE_DB_MODE || 'baserow';
const BASEROW_URL = import.meta.env.VITE_BASEROW_WEBHOOK_URL || 'http://localhost:5678/webhook/reservas';

/**
 * Guarda una reserva en la base de datos configurada en .env
 * @param {Object} payload 
 */
export const saveReservation = async (payload) => {
  if (DB_MODE === 'supabase') {
    return await saveToSupabase(payload);
  } else {
    return await saveToBaserow(payload);
  }
};

/**
 * Lógica para guardar en Supabase
 */
const saveToSupabase = async (payload) => {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Revisa tus variables en .env');
  }

  // Asumimos que la tabla se llama 'reservas'
  const { data, error } = await supabase
    .from('reservas')
    .insert([
      {
        nombre_tutor: payload.nombreTutor,
        nombre_nino: payload.nombreNiño,
        email: payload.email,
        telefono: payload.telefono,
        fecha_evento: payload.fechaEvento,
        notas: payload.notas,
        fecha_registro: payload.timestamp
      }
    ]);

  if (error) {
    throw new Error(`Error en Supabase: ${error.message}`);
  }
  
  return data;
};

/**
 * Lógica para guardar en Baserow (Webhook via n8n)
 */
const saveToBaserow = async (payload) => {
  const response = await fetch(BASEROW_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Error en Webhook/Baserow: ${response.statusText}`);
  }

  // Asumiendo que n8n devuelve un texto o un JSON vacío al terminar
  return await response.text();
};
