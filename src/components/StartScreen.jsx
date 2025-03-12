function StartScreen({numQuestions}) {
    return (
        <div className="start">
            <h3>Welcome to The React Quiz!</h3>
            <p>{numQuestions} questions to test your React mastery</p>
            <button className="btn btn-ui">Let's start</button>
        </div>
    )
}

export default StartScreen;
