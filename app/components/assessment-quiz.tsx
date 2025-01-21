"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Question, AssessmentResult } from "@/types/assessment"

interface AssessmentQuizProps {
  questions: Question[]
  onComplete: (result: AssessmentResult) => void
}

export function AssessmentQuiz({ questions, onComplete }: AssessmentQuizProps) {
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const correctAnswers = questions.reduce((count, question) => {
      return count + (currentAnswers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)

    const result: AssessmentResult = {
      totalQuestions: questions.length,
      correctAnswers,
      score: (correctAnswers / questions.length) * 100,
      answers: currentAnswers,
    }

    onComplete(result)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Assessment Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <h3 className="text-lg font-medium">
                {index + 1}. {question.question}
              </h3>
              <RadioGroup
                value={currentAnswers[question.id]}
                onValueChange={(value) => setCurrentAnswers((prev) => ({ ...prev, [question.id]: value }))}
                className="space-y-2"
              >
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${question.id}-${optionIndex}`} />
                    <Label htmlFor={`q${question.id}-${optionIndex}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button type="submit" className="w-full" size="lg">
            Submit Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

