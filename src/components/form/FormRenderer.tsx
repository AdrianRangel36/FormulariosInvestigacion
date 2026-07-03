import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { AnswersState, FormDefinition } from '../../types/form'
import { Section } from './Section'

interface FormRendererProps {
  form: FormDefinition
  onSubmit?: (answers: AnswersState) => void | Promise<void>
}

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

function isAnswerMissing(value: AnswersState[string]) {
  if (value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (typeof value === 'number') return Number.isNaN(value)
  return false
}

export function FormRenderer({ form, onSubmit }: FormRendererProps) {
  const [answers, setAnswers] = useState<AnswersState>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' })
  // Synchronous guard against rapid double/triple clicks: a ref updates
  // immediately, unlike state which only reflects after a re-render, so
  // clicks fired before React re-renders still see the in-flight flag.
  const submittingRef = useRef(false)

  function handleAnswerChange(questionId: string, value: AnswersState[string]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setErrors((prev) => {
      if (!(questionId in prev)) return prev
      const next = { ...prev }
      delete next[questionId]
      return next
    })
    setStatus({ kind: 'idle' })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Bail if a submit is already in flight (guards against rapid re-clicks).
    if (submittingRef.current) return

    const nextErrors: Record<string, string> = {}
    for (const section of form.sections) {
      for (const question of section.questions) {
        if (question.required && isAnswerMissing(answers[question.id])) {
          nextErrors[question.id] = 'Esta pregunta es obligatoria.'
        }
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: 'idle' })
      return
    }

    submittingRef.current = true
    setStatus({ kind: 'submitting' })
    try {
      await onSubmit?.(answers)
      setStatus({ kind: 'success' })
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'No se pudo enviar el formulario. Intente de nuevo.',
      })
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <div className="overflow-hidden rounded-2xl border border-(--border) border-l-4 border-l-(--accent) bg-(--surface) shadow-(--shadow)">
        <div className="p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-(--text-h)">{form.title}</h1>
          {form.description && (
            <p className="mt-3 text-(--text)">{form.description}</p>
          )}
        </div>
      </div>

      {form.sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          answers={answers}
          errors={errors}
          onChange={handleAnswerChange}
        />
      ))}

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-(--shadow)">
        <button
          type="submit"
          disabled={status.kind === 'submitting' || status.kind === 'success'}
          className="rounded-lg bg-(--accent) px-7 py-2.5 font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        >
          {status.kind === 'submitting'
            ? 'Enviando...'
            : status.kind === 'success'
              ? 'Enviado'
              : 'Enviar'}
        </button>

        {status.kind === 'success' && (
          <p className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-(--text-h)">
            Respuestas enviadas correctamente.
          </p>
        )}
        {status.kind === 'error' && (
          <p className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-700">
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
