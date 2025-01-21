"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import type { AssessmentConfig, Question } from "@/types/assessment"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function generateQuestions(config: AssessmentConfig): Promise<Question[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Generate a JSON array of ${config.numberOfQuestions} multiple choice questions for ${config.subject} suitable for class ${config.class} at ${config.difficulty} difficulty level. 

Each question must strictly follow this format:
{
  "id": (number),
  "question": "question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": "exact match of one option"
}

Ensure the response is valid JSON and each correctAnswer exactly matches one of the options.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to parse the response as JSON
    let questions: Question[]
    try {
      questions = JSON.parse(text)
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Invalid response format")
      }
    }

    // Validate the questions array
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No questions generated")
    }

    // Validate each question
    questions = questions.map((q, index) => ({
      id: q.id || index + 1,
      question: q.question,
      options: Array.isArray(q.options) ? q.options : [],
      correctAnswer: q.correctAnswer,
    }))

    // Ensure all questions have required fields
    const invalidQuestion = questions.find(
      (q) => !q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.correctAnswer,
    )
    if (invalidQuestion) {
      throw new Error("Invalid question format")
    }

    return questions
  } catch (error) {
    console.error("Error in generateQuestions:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to generate questions")
  }
}

