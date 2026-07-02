import { Link } from 'react-router-dom'
import type { AnswersState, FormDefinition } from '../types/form'
import { FormRenderer } from '../components/form/FormRenderer'

interface FormPageProps {
  form: FormDefinition
}

export function FormPage({ form }: FormPageProps) {
  function handleSubmit(answers: AnswersState) {
    console.log('Formulario enviado:', form.id, answers)
  }

  return (
    <div className="min-h-svh bg-(--bg) px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <Link
          to="/"
          className="self-start text-sm font-medium text-(--accent) hover:underline"
        >
          ← Volver al menú
        </Link>
        <FormRenderer form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
