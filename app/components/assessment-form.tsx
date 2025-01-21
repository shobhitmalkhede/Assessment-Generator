"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AssessmentConfig } from "@/types/assessment"

interface AssessmentFormProps {
  onSubmit: (config: AssessmentConfig) => void
}

export function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const [config, setConfig] = useState<AssessmentConfig>({
    class: "",
    subject: "",
    difficulty: "Medium",
    numberOfQuestions: 10,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    if (!config.class) {
      alert("Please select a class")
      return
    }
    if (!config.subject) {
      alert("Please select a subject")
      return
    }
    if (config.numberOfQuestions < 1 || config.numberOfQuestions > 100) {
      alert("Please enter a valid number of questions (1-100)")
      return
    }

    onSubmit(config)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Assessment Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="class">Choose the Class</Label>
            <Select value={config.class} onValueChange={(value) => setConfig({ ...config, class: value })}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Select the Subject</Label>
            <Select value={config.subject} onValueChange={(value) => setConfig({ ...config, subject: value })}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {["Math", "Science", "English", "History", "Geography"].map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Choose Difficulty Level</Label>
            <div className="flex gap-4">
              {["Easy", "Medium", "Hard"].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={config.difficulty === level ? "default" : "outline"}
                  onClick={() => setConfig({ ...config, difficulty: level as AssessmentConfig["difficulty"] })}
                  className="flex-1"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Input
              id="questions"
              type="number"
              min="1"
              max="100"
              value={config.numberOfQuestions}
              onChange={(e) => setConfig({ ...config, numberOfQuestions: Number.parseInt(e.target.value) || 1 })}
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Generate Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

