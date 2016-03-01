import { cache } from 'aa-db/db/db.json'

import { randomInt } from './utils'

class Question {
  constructor (cachedQuestion = {}) {
    this.selectedAnswer = ''
    Object.assign(this, cachedQuestion)
  }

  static of ({ value }) {
    return new Question(value)
  }

  selectAnswer (selectAnswer) {
    return new Question({ ...this, selectedAnswer })
  }
}

const questions = cache.map(Question.of)

export function randomQuestions (length = 30) {
  const result = []

  for (let i = 0; i < length; i++) {
    const index = randomInt({ max: questions.length - 1 })
    result.push(...questions.splice(index, 1))
  }

  return result
}

export default class  QuestionsState {
  constructor() {

  }
}
