import type { AnswerValue, Question } from '../../types/form'
import { TextQuestion } from './questions/TextQuestion'
import { SingleChoiceQuestion } from './questions/SingleChoiceQuestion'
import { LikertQuestion } from './questions/LikertQuestion'
import { NumericQuestion } from './questions/NumericQuestion'

interface QuestionRendererProps {
  question: Question
  value: AnswerValue
  error?: string
  onChange: (value: AnswerValue) => void
}

export function QuestionRenderer({
  question,
  value,
  error,
  onChange,
}: QuestionRendererProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-(--surface-alt) p-4">
      <label htmlFor={question.id} id={question.id} className="font-medium text-(--text-h)">
        {question.prompt}
        {question.required && <span className="ml-1 text-(--accent)">*</span>}
      </label>
      {question.helperText && (
        <p className="text-sm text-(--text)">{question.helperText}</p>
      )}
      {renderQuestionInput(question, value, onChange)}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

function renderQuestionInput(
  question: Question,
  value: AnswerValue,
  onChange: (value: AnswerValue) => void,
) {
  switch (question.type) {
    case 'text':
      return (
        <TextQuestion
          question={question}
          value={value as string | undefined}
          onChange={onChange}
        />
      )
    case 'singleChoice':
      return (
        <SingleChoiceQuestion
          question={question}
          value={value as string | undefined}
          onChange={onChange}
        />
      )
    case 'likert':
      return (
        <LikertQuestion
          question={question}
          value={value as number | undefined}
          onChange={onChange}
        />
      )
    case 'numeric':
      return (
        <NumericQuestion
          question={question}
          value={value as number | undefined}
          onChange={onChange}
        />
      )
    default: {
      const exhaustiveCheck: never = question
      throw new Error(`Tipo de pregunta no soportado: ${JSON.stringify(exhaustiveCheck)}`)
    }
  }
}
