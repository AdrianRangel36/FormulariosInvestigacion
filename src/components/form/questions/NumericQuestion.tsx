import type { NumericQuestion as NumericQuestionType } from '../../../types/form'

interface NumericQuestionProps {
  question: NumericQuestionType
  value: number | undefined
  onChange: (value: number) => void
}

export function NumericQuestion({ question, value, onChange }: NumericQuestionProps) {
  return (
    <input
      id={question.id}
      type="number"
      value={value ?? ''}
      min={question.min}
      max={question.max}
      step={question.step ?? 1}
      onChange={(e) => onChange(e.target.valueAsNumber)}
      className="w-32 rounded-md border border-(--border) bg-(--surface) p-2 text-(--text-h) outline-none focus:border-(--accent)"
    />
  )
}
