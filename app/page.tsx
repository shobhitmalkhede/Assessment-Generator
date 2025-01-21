"use client"

import { useState } from "react"
import { AssessmentForm } from "./components/assessment-form"
import { AssessmentQuiz } from "./components/assessment-quiz"
import { AssessmentResults } from "./components/assessment-results"
import { generateQuestions } from "./actions"
import type { Question, AssessmentConfig, AssessmentResult } from "@/types/assessment"
import { GraduationCap } from "lucide-react"

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfigSubmit = async (config: AssessmentConfig) => {
    try {
      setError(null)
      setLoading(true)
      const generatedQuestions = await generateQuestions(config)
      setQuestions(generatedQuestions)
      setResult(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate questions")
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = (quizResult: AssessmentResult) => {
    setResult(quizResult)
  }

  const handleRestart = () => {
    setQuestions([])
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Assessment Generator</h1>
          </div>
        </header>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center">
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center">Generating questions...</div>
        ) : result ? (
          <AssessmentResults result={result} questions={questions} onRestart={handleRestart} />
        ) : questions.length > 0 ? (
          <AssessmentQuiz questions={questions} onComplete={handleQuizComplete} />
        ) : (
          <AssessmentForm onSubmit={handleConfigSubmit} />
        )}

        <footer className="text-center mt-8 text-sm text-muted-foreground">Powered by GenAI</footer>
      </div>
    </main>
  )
}

