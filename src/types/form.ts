export type QuestionType = 'text' | 'singleChoice' | 'likert' | 'numeric'

interface BaseQuestion {
  id: string
  prompt: string
  helperText?: string
  required: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: 'text'
  placeholder?: string
  maxLength?: number
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'singleChoice'
  options: { value: string; label: string }[]
}

export interface LikertQuestion extends BaseQuestion {
  type: 'likert'
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
  // Optional per-point labels (e.g. ["Muy Bajo", ..., "Muy Alto"]); index 0 = min.
  labels?: string[]
}

export interface NumericQuestion extends BaseQuestion {
  type: 'numeric'
  min?: number
  max?: number
  step?: number
}

export type Question =
  | TextQuestion
  | SingleChoiceQuestion
  | LikertQuestion
  | NumericQuestion

export interface FormSection {
  id: string
  title: string
  description?: string
  questions: Question[]
}

export interface FormDefinition {
  id: string
  title: string
  description?: string
  sections: FormSection[]
}

export type AnswerValue = string | number | undefined

export type AnswersState = Record<string, AnswerValue>
