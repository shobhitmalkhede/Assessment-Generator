export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

export interface AssessmentConfig {
  class: string
  subject: string
  difficulty: "Easy" | "Medium" | "Hard"
  numberOfQuestions: number
}

export interface AssessmentResult {
  totalQuestions: number
  correctAnswers: number
  score: number
  answers: Record<number, string>
}

