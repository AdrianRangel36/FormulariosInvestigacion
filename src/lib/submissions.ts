import { supabase } from './supabaseClient'
import type { AnswersState } from '../types/form'

export type SubmitResult = { ok: true } | { ok: false; error: string }

export async function submitFormResponse(
  formId: string,
  answers: AnswersState,
): Promise<SubmitResult> {
  const { error } = await supabase
    .from('form_submissions')
    .insert({ form_id: formId, answers })

  if (error) {
    console.error('Error al guardar la respuesta:', error)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}
