import React, {useState, useEffect, Fragment} from 'react';
import './App.css';

function App() {
  const questions = [
    {
        id:1,
       text: "What is the capital of india",
       options: [
        { id:'1', text: 'Delhi', isCorrect: true },
        { id:'2',text: 'UP', isCorrect: false },
        { id:'3',text: 'MP', isCorrect: false },
        { id:'4',text: 'Chandigarh', isCorrect: false},
       ]
    },
    {
      id:2,
      text: "What is the capital of Bangladesh",
      options: [
       { id:'1', text: 'Dhaka', isCorrect: true },
       { id:'2', text: 'tokoyo', isCorrect: false },
       { id:'3', text: 'imphal', isCorrect: false },
       { id:'4', text: 'dehradoon', isCorrect: false},
      ]
    },
  ]
  const TIME_LIMIT = 30;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLimit, setTimeLimit] = useState(TIME_LIMIT); // 30 seconds
  const [questionCorrect, setQuestionCorrect] = useState('');
  const [optionId, setOptionId] = useState(null);
  const [notAnswered, setNotAnswered] = useState(questions);
  useEffect(() => {    
    if (timeLimit === 0) {      
      setTimeout(() => {
        nextQuestionHandler();
      }, 1000)
    }

    !showScore && timeLimit > 0 && setTimeout(()=> {
        setTimeLimit(timeLimit - 1)
    }, 1000);
  });

  const optionClickHandler = (option, currentQuestion) => {
      const newList = notAnswered.filter((question) => question.id === questions[currentQuestion].id);
      setNotAnswered(newList);

      if (option.isCorrect) {
        setTotalScore(totalScore + 1);
        setQuestionCorrect('correct-answer');
      } else {
        setQuestionCorrect('incorrect-answer')
      }
      setOptionId(option.id);
      setTimeout(() => {
          nextQuestionHandler();
      }, 1000)      
  }

  const nextQuestionHandler = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
        setTimeLimit(TIME_LIMIT);
        setCurrentQuestion(nextQuestion);
        setQuestionCorrect('');
    } else {
      setShowScore(true);
    }
  }

  return (
    <Fragment>
      <div className='text-center'>Quiz App</div>
      <div className='flex-container'>
          <span>Question {currentQuestion + 1}/ {questions.length}</span>
          {
              !showScore
              ?
              <span>Time Left: {timeLimit}</span>
              :
              <span>Time Up!!</span>
          }
      </div>
      <div className="App">
          {
            showScore
            ?
            <div className='flex-container-column'>
              <div className='score'>
                  Your score {totalScore} / {questions.length}
              </div>
              <div className='question-area'>                
              {
                showScore && (notAnswered.length > 0)
                ?
                <Fragment>
                <p style={{fontWeight:'bold'}}>Un - Attempted question</p>
                {
                  notAnswered.map((question, index) => <p>{notAnswered[index].text}</p>)
                }
                </Fragment>
                :
                'All question answered'
              }
              </div>
            </div>
            :

            <div className='flex-container'>
              <div className='question-area'>{questions[currentQuestion].text}</div>
              <div className='answer-area'>
                  {
                      questions[currentQuestion].options.map((option) => {
                          return questionCorrect && (option.id === optionId)
                                 ?
                                 <button key={option.id} className={questionCorrect}>{option.text}</button>
                                 :
                                 <button key={option.id}  onClick={() => optionClickHandler(option, currentQuestion)}>{option.text}</button>
                        }
                        
                      )
                  }
              </div>
            </div>
                  
          }
      </div>
    </Fragment>
  );
}

export default App;
