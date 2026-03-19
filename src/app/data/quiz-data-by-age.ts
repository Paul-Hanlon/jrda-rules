import { ReadingAge } from '../models/reading-age';
import { QuizTopic } from '../models/quiz';
import { QUIZ_TOPICS_7_8 } from './quiz.data.7-8';
import { QUIZ_TOPICS_9_10 } from './quiz.data.9-10';
import { QUIZ_TOPICS_11_12 } from './quiz.data.11-12';
import { QUIZ_TOPICS_13_PLUS } from './quiz.data.13+';

export const QUIZ_DATA_BY_AGE: Record<ReadingAge, QuizTopic[]> = {
  '7-8': QUIZ_TOPICS_7_8,
  '9-10': QUIZ_TOPICS_9_10,
  '11-12': QUIZ_TOPICS_11_12,
  '13+': QUIZ_TOPICS_13_PLUS,
};
