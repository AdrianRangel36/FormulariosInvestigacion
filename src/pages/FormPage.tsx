import { Link } from 'react-router-dom'
import type { AnswersState, FormDefinition } from '../types/form'
import { FormRenderer } from '../components/form/FormRenderer'
import { submitFormResponse } from '../lib/submissions'

interface FormPageProps {
  form: FormDefinition
}

export function FormPage({ form }: FormPageProps) {
  async function handleSubmit(answers: AnswersState) {
    const result = await submitFormResponse(form.id, answers)
    if (!result.ok) {
      throw new Error(result.error)
    }
  }

  return (
    <div className="min-h-svh px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          ← Volver al menú
        </Link>
        <FormRenderer form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
