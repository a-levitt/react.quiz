import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import NextButton from "./components/NextButton.jsx";
import Progress from "./components/Progress.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0
}

function reducer(state, action) {
    switch(action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        case 'start':
            return {
                ...state,
                status: 'active'
            }
        case 'newAnswer':
            {
                const question = state.questions.at(state.index);
                return {
                    ...state,
                    answer: action.payload,
                    points: action.payload === question.correctOption ?
                        state.points + question.points
                        : state.points
                };
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ?
                    state.points
                    : state.highscore
            }

        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

function App() {
    const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data)=>dispatch({type: 'dataReceived', payload: data}))
            .catch((err)=>dispatch({type: 'dataFailed'}));
    }, []);

    return (
      <div className="app">
          <Header />
          <Main>
              {status === 'loading' && <Loader/>}
              {status === 'error' && <Error/>}
              {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
              {status === 'active' &&
                  <>
                      <Progress
                          numQuestions={numQuestions}
                          index={index}
                          points={points}
                          maxPoints={maxPoints}
                          answer={answer}
                      />
                      <Question
                        question={questions[index]}
                        dispatch={dispatch}
                        answer={answer}
                      />
                      <NextButton
                          dispatch={dispatch}
                          answer={answer}
                          index={index}
                          numQuestions={numQuestions}
                      />
                  </>
              }
              {status === 'finished' &&
                  <FinishScreen
                      points={points}
                      maxPoints={maxPoints}
                      highscore={highscore}
                  />
              }
          </Main>
      </div>
    );
}

export default App
