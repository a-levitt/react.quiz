import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";

const initialState = {
    questions: [],
    status: 'loading'
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
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

function App() {
    const [{questions, status}, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;

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
              {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
          </Main>
      </div>
    );
}

export default App
