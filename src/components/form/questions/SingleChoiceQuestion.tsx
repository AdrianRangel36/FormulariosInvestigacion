import type { SingleChoiceQuestion as SingleChoiceQuestionType } from '../../../types/form'

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType
  value: string | undefined
  onChange: (value: string) => void
}

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
}: SingleChoiceQuestionProps) {
  return (
    <div role="radiogroup" aria-labelledby={question.id} className="flex flex-col gap-2">
      {question.options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-(--surface) px-3 py-2 text-(--text-h)"
        >
          <input
            type="radio"
            name={question.id}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="accent-(--accent)"
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
