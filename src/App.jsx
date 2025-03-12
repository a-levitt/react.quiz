import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import {useEffect} from "react";


function App() {
    useEffect(() => {
        fetch("http://localhost:8000/questions").then((res) =>
            res.json()).then(data=>console.log(data)).catch(err=>console.error(err));
    }, []);

    return (
      <div className="app">
        <Header />

          <Main>
              <p>1/15</p>
              <p>Question?</p>
          </Main>
      </div>
    );
}

export default App
