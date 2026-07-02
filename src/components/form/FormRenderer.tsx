import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AnswersState, FormDefinition } from '../../types/form'
import { Section } from './Section'

interface FormRendererProps {
  form: FormDefinition
  onSubmit?: (answers: AnswersState) => void
}

function isAnswerMissing(value: AnswersState[string]) {
  if (value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (typeof value === 'number') return Number.isNaN(value)
  return false
}

export function FormRenderer({ form, onSubmit }: FormRendererProps) {
  const [answers, setAnswers] = useState<AnswersState>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function handleAnswerChange(questionId: string, value: AnswersState[string]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setErrors((prev) => {
      if (!(questionId in prev)) return prev
      const next = { ...prev }
      delete next[questionId]
      return next
    })
    setSubmitted(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const nextErrors: Record<string, string> = {}
    for (const section of form.sections) {
      for (const question of section.questions) {
        if (question.required && isAnswerMissing(answers[question.id])) {
          nextErrors[question.id] = 'Esta pregunta es obligatoria.'
        }
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log('Respuestas:', answers)
      onSubmit?.(answers)
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-(--shadow)">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-(--text-h)">{form.title}</h1>
          {form.description && (
            <p className="mt-2 text-(--text)">{form.description}</p>
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

      <div className="flex items-center justify-between rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-(--shadow)">
        <button
          type="submit"
          className="rounded-md bg-(--accent) px-6 py-2 font-medium text-white"
        >
          Enviar
        </button>
        {submitted && (
          <p className="rounded-md border border-(--accent-border) bg-(--accent-bg) px-4 py-2 text-(--text-h)">
            Respuestas enviadas correctamente.
          </p>
        )}
      </div>
    </form>
  )
}
