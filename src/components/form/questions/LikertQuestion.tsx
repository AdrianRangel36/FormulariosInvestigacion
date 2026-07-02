import type { LikertQuestion as LikertQuestionType } from '../../../types/form'

interface LikertQuestionProps {
  question: LikertQuestionType
  value: number | undefined
  onChange: (value: number) => void
}

export function LikertQuestion({ question, value, onChange }: LikertQuestionProps) {
  const min = question.min ?? 1
  const max = question.max ?? 5
  const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="flex flex-col gap-2">
      <div role="radiogroup" aria-labelledby={question.id} className="flex flex-wrap gap-2">
        {scale.map((n) => (
          <label
            key={n}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-(--text-h) ${
              value === n
                ? 'border-(--accent) bg-(--accent-bg)'
                : 'border-(--border) bg-(--surface)'
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      {(question.minLabel || question.maxLabel) && (
        <div className="flex justify-between text-sm text-(--text)">
          <span>{question.minLabel}</span>
          <span>{question.maxLabel}</span>
        </div>
      )}
    </div>
  )
}
