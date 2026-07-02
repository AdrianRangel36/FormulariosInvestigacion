import type { AnswersState, FormSection } from '../../types/form'
import { QuestionRenderer } from './QuestionRenderer'

interface SectionProps {
  section: FormSection
  answers: AnswersState
  errors: Record<string, string>
  onChange: (questionId: string, value: AnswersState[string]) => void
}

export function Section({ section, answers, errors, onChange }: SectionProps) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-(--border) bg-(--surface) p-6 text-left shadow-(--shadow)">
      <div>
        <h2 className="text-xl font-semibold text-(--text-h)">{section.title}</h2>
        {section.description && (
          <p className="mt-1 text-sm text-(--text)">{section.description}</p>
        )}
      </div>
      {section.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={answers[question.id]}
          error={errors[question.id]}
          onChange={(value) => onChange(question.id, value)}
        />
      ))}
    </section>
  )
}
