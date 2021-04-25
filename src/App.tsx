import { start } from 'node:repl';
import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';

import {fetchQuizQuestions} from './API';

import {QuestionState, Difficulty} from './API';

//styles
import { GlobalStyle, Wrapper } from './App.styles';
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameOver] = useState(true);

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameover) {
      //user answer
      const answer = e.currentTarget.value;

      //check answer vs correct value 
      const correct = answer === questions[number].correct_answer;

      if(correct) setScore(prev => prev +1);
      //save user answer 
      const ansObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, ansObject])
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {
        gameover || userAnswers.length === TOTAL_QUESTIONS ? ( 
          <button className="start" onClick={startTrivia}>
          {userAnswers.length === TOTAL_QUESTIONS ? 'Restart' : 'Start'}
        </button>) : null
      }
      {!gameover ? <p className="score">Score: {score}</p> : null }
      
      {loading && <p className="loading">Loading Questions...</p>}
      {!loading && !gameover && (
          <QuestionCard 
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameover && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
          </button>
        ) : null
      }
      
    </Wrapper>
    </>
  );
}

export default App;
