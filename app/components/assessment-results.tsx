"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Question, AssessmentResult } from "@/types/assessment"

interface AssessmentResultsProps {
  result: AssessmentResult
  questions: Question[]
  onRestart: () => void
}

export function AssessmentResults({ result, questions, onRestart }: AssessmentResultsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold">{result.score.toFixed(1)}%</p>
          <p className="text-muted-foreground">
            {result.correctAnswers} out of {result.totalQuestions} correct
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 rounded-lg ${
                result.answers[question.id] === question.correctAnswer
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <h3 className="font-medium mb-2">
                {index + 1}. {question.question}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">Your answer: {result.answers[question.id]}</p>
              <p className="text-sm text-muted-foreground">Correct answer: {question.correctAnswer}</p>
            </div>
          ))}
        </div>

        <Button onClick={onRestart} className="w-full" size="lg">
          Start New Assessment
        </Button>
      </CardContent>
    </Card>
  )
}

