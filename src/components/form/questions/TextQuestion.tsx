import type { TextQuestion as TextQuestionType } from '../../../types/form'

interface TextQuestionProps {
  question: TextQuestionType
  value: string | undefined
  onChange: (value: string) => void
}

export function TextQuestion({ question, value, onChange }: TextQuestionProps) {
  return (
    <textarea
      id={question.id}
      value={value ?? ''}
      placeholder={question.placeholder}
      maxLength={question.maxLength}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full rounded-md border border-(--border) bg-(--surface) p-3 text-(--text-h) outline-none focus:border-(--accent)"
    />
  )
}
