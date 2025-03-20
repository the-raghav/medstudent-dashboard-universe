
import { useState } from 'react';
import { Brain, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DEFAULT_QUESTIONS: MCQQuestion[] = [
  {
    id: '1',
    question: 'Which of the following is NOT a function of the liver?',
    options: [
      'Protein synthesis', 
      'Detoxification', 
      'Production of insulin', 
      'Bile production'
    ],
    correctAnswer: 2,
    explanation: 'The pancreas, not the liver, produces insulin. The liver is responsible for protein synthesis, detoxification, and bile production, among other functions.'
  },
  {
    id: '2',
    question: 'Which heart chamber pumps blood to the lungs?',
    options: [
      'Left atrium', 
      'Left ventricle', 
      'Right atrium', 
      'Right ventricle'
    ],
    correctAnswer: 3,
    explanation: 'The right ventricle pumps deoxygenated blood to the lungs via the pulmonary artery.'
  },
  {
    id: '3',
    question: 'The cerebellum is primarily responsible for:',
    options: [
      'Language processing', 
      'Motor coordination', 
      'Memory formation', 
      'Emotional responses'
    ],
    correctAnswer: 1,
    explanation: 'The cerebellum is primarily responsible for motor coordination and balance.'
  }
];

const MCQQuiz = () => {
  const [questions] = useState<MCQQuestion[]>(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null && !isAnswered) {
      setIsAnswered(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Daily Medical Quiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-500 mb-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>Score: {score}/{questions.length}</span>
            </div>
            <Progress value={progress} className="h-1.5" />
            
            <div className="pt-2">
              <h3 className="font-medium text-lg mb-3">{currentQuestion.question}</h3>
              
              <RadioGroup value={selectedOption?.toString()} className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isAnswered && index === currentQuestion.correctAnswer 
                        ? 'bg-green-50 border-green-200'
                        : isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer
                          ? 'bg-red-50 border-red-200'
                          : selectedOption === index
                            ? 'bg-slate-50 border-slate-300'
                            : 'border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`} 
                      disabled={isAnswered}
                      className={isAnswered && index === currentQuestion.correctAnswer ? 'text-green-600' : ''}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="w-full cursor-pointer flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {isAnswered && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Explanation:</p>
                  <p className="text-sm text-blue-700 mt-1">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-xl font-medium mb-2">Quiz Completed!</h3>
            <p className="text-slate-600 mb-4">Your score: {score}/{questions.length}</p>
            <div className="inline-block rounded-full bg-slate-100 p-6 mb-4">
              <Brain className="h-12 w-12 text-bloomin-600" />
            </div>
            <p className="text-sm text-slate-500 mb-6">
              {score === questions.length 
                ? 'Perfect score! You\'ve mastered these concepts.'
                : score >= questions.length / 2
                  ? 'Good job! Keep learning to improve your knowledge.'
                  : 'Keep studying and try again to improve your score.'
              }
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {!quizCompleted ? (
          <>
            {!isAnswered ? (
              <Button 
                variant="default" 
                className="w-full bg-bloomin-500 hover:bg-bloomin-600"
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="w-full bg-bloomin-500 hover:bg-bloomin-600"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleRestartQuiz}
          >
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MCQQuiz;
