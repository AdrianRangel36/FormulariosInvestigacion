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
  const labels = question.labels

  return (
    <div className="flex flex-col gap-2">
      <div role="radiogroup" aria-labelledby={question.id} className="flex flex-wrap gap-2">
        {scale.map((n, i) => {
          const selected = value === n
          return (
            <label
              key={n}
              className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border text-center ${
                labels ? 'min-w-16 flex-1 px-2 py-2' : 'h-10 w-10'
              } ${
                selected
                  ? 'border-(--accent) bg-(--accent-bg)'
                  : 'border-(--border) bg-(--surface)'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={n}
                checked={selected}
                onChange={() => onChange(n)}
                className="sr-only"
              />
              <span className="font-medium text-(--text-h)">{n}</span>
              {labels?.[i] && (
                <span className="text-xs leading-tight text-(--text)">{labels[i]}</span>
              )}
            </label>
          )
        })}
      </div>
      {!labels && (question.minLabel || question.maxLabel) && (
        <div className="flex justify-between text-sm text-(--text)">
          <span>{question.minLabel}</span>
          <span>{question.maxLabel}</span>
        </div>
      )}
    </div>
  )
}
