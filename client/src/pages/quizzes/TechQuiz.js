/* Import hooks and packages */
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";

/* import Components */
import Modal from "../../components/Modal";
import Timer from "../../components/Timer";
import Loader from "../../components/Loader";

function capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

/* ---------------------------------------------------------------- */

/* Get questions from server */
const getQuestions = async (state, setState, location) => {
    try{
        const { domain, subdomain } = location.state
        // console.log(location.state)
        const res = await axios.post('/api/questions/get', {
            domain,
            subdomain,
        })
        // console.log(res.data.questions)
        setState({
            ...state,
            questions: res.data.questions
        })
    }
    catch(err){
        console.error(err.response)
    }
}

const authorizeUser = async (navigate, setUser) => {
    try{
        const res = await axios.get('/api/auth/authorize')
        // console.log(res.data)
        setUser(res.data)
    }
    catch(err){
        console.error(err.response.data)
        navigate('/')
    }
}

const getElapsedTime = (time1, time2) => {
    // return [ minutes, seconds ]
    const elapsedTime = time2-time1
    const minutes = Math.floor(elapsedTime/1000/60)
    const seconds = Math.floor((elapsedTime/1000/60 - minutes)*60)
    return [minutes, seconds]
}

/* ---------------------------------------------------------------- */

/* Quiz component */
const TechQuiz = () => {

    // Define hooks
    const navigate = useNavigate()
    const location = useLocation()

    // Initialize states
    const [isVisible, setIsVisible] = useState(!document.hidden)
    const [user, setUser] = useState(false)
    const [state, setState] = useState({
        currentQuestion: 0,
        questions: false,
        responses: {},
        blueButton: 'blueButton',
        blackButton: 'blackButton',
        showModal: false,
        problem: {status: false, message: ''}
    })

    // Finish the test session if user changes tabs
    const handleVisibility = useCallback(() => setIsVisible(!document.hidden), [])
    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibility)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility)
        }
    }, [handleVisibility])

    // Get user and questions asynchronously
    useEffect(function(){
        if(!location.state) navigate('/selection')
        else{
            authorizeUser(navigate, setUser)
            getQuestions(state, setState, location) 
        }   // eslint-disable-next-line
    },[])

    // On tab change or browser window close
    useEffect(() => {                   
        if(!isVisible) onConfirm()       // eslint-disable-next-line
    }, [isVisible])

    // Options array
    const optionsArray = ['a', 'b', 'c', 'd']

    // Update selected option
    const updateOption = (e) => {
        e.persist()
        const option = e.target.value
        if(option) {
            const temp = {...state.responses}
            temp[`${state.currentQuestion}`] = option
            setState({
                ...state,
                responses: {...temp},
                problem: {status: false, message: ''}
            })
        }
    }

    // Go to previous question
    const gotoPreviousQuestion = () => {
        if(state.currentQuestion > 0){
            setState({
                ...state,
                currentQuestion: state.currentQuestion-1,
                problem: {status: false, message: ''}
            })
        }
    }

    // Go to next question
    const gotoNextQuestion = () => {
        if(!state.responses[state.currentQuestion]){
            setState({
                ...state,
                problem: {status: true, message: 'Please select an option'}
            })
        }
        if(state.currentQuestion < state.questions.length-1 && 
           state.responses[state.currentQuestion]){
            setState({
                ...state,
                currentQuestion: state.currentQuestion+1,
                problem: {status: false, message: ''}
            })
        }
    }

    // Show confirmation modal on clicking Submit
    const showModal1 = () => {
        setState({
            ...state,
            showModal: true
        })
    }

    // Hide modal 
    const hideModal = () => {
        setState({
            ...state,
            showModal: false
        })
    }

    // Handle submit
    const onSubmit = () => {
        if(!state.responses[state.currentQuestion]){
            setState({
                ...state,
                problem: {status: true, message: 'Please select an option'}
            })
        }
        else{
            showModal1()
        }
    }

    // On confirming submit
    const onConfirm = async () => {
        hideModal()
        // console.log(state.responses)
        const responses = Object.keys(state.responses).map((index) => {
            return {
                question: state.questions[index],
                response: state.responses[index]
            }
        })
        const { domain, subdomain } = location.state
        const body = { domain, subdomain, responses }
        try{
            await axios.post(`/api/responses/send`, body)
            navigate('/selection')
        }
        catch(err){
            console.error(err)
        }
    }

    let initialMinute=10, initialSecond=0
    if(user){
        const remainingTime = JSON.parse(user.test.remainingTime)
        initialMinute = remainingTime[0] > 10 ? 10 : remainingTime[0]
        initialSecond = remainingTime[0] > 10 ? 0 : remainingTime[1]
    }
    if(user && user.test.isTakingTest){
        const time1 = new Date(user.test.testStartedAt)
        const time2 = new Date()
        const elapsedTime = getElapsedTime(time1,time2)
        if(initialSecond < elapsedTime[1]){
            initialMinute -= (elapsedTime[0]+1)
            initialSecond = initialSecond-elapsedTime[1]+60
        }
        else{
            initialMinute -= elapsedTime[0]
            initialSecond -= elapsedTime[1]
        }
    }

    // JSX ---------------------------------------------------------------------------------
    if(!state.questions || !user){
        return <Loader/>
    }

    else return (
        <div className="quizMain">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", alignSelf: "flex-start"}}>
                <div className="heading">{capitalize(location.state.domain)} Quiz</div>
                    <div className="question-section">

                        {/* QUESTION COUNT  eg: (1/10) */}
                        <div className="question-count">
                            <span>
                                Question{" "}
                                {state.currentQuestion + 1}
                            </span>
                            /{state.questions?.length}
                        </div>

                        {/* QUESTION DESCRIPTION */}
                        <div className="tech-quiz">
                        {
                            state.questions ? state.questions[state.currentQuestion].question : <p></p>
                        }
                        </div>
                    </div>

                {/* Answer section */}
                <div className="answer-section">
                    {state.questions ? 
                    Object.keys(
                        state.questions[
                            state.currentQuestion
                        ].options
                    ).map((key,index) => {
                        if (
                            state.responses[
                                `${state.currentQuestion}`
                            ] === undefined
                        ) {
                            return (
                                <div
                                    key={index}
                                    onClick={updateOption}
                                >
                                    <button
                                        className={
                                            state.responses[state.currentQuestion] === key ?
                                            'blueButton' : 'blackButton' 
                                        }
                                        value={key}
                                    >
                                        {
                                            optionsArray[index]
                                        }
                                        .{" "}
                                        {
                                            state.questions[state.currentQuestion].options[key]
                                        }
                                    </button>
                                </div>
                            );
                        } else {
                            if (
                                state.responses[`${state.currentQuestion}`].response === optionsArray[index]
                            ) {
                                return (
                                    <div
                                        key={index}
                                        onClick={updateOption}
                                    >
                                        <button
                                            className={
                                                state.responses[state.currentQuestion] === key ?
                                                'blueButton' : 'blackButton' 
                                            }
                                            value={optionsArray[index]}
                                        >
                                            {optionsArray[index]}
                                            .{" "}
                                            {state.questions[state.currentQuestion].options[key]}
                                        </button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={index}
                                        onClick={updateOption}
                                    >
                                        <button
                                            className={
                                                state.responses[state.currentQuestion] === key ?
                                                'blueButton' : 'blackButton' 
                                            }
                                            value={optionsArray[index]}
                                        >
                                            {optionsArray[index]}
                                            .{" "}
                                            {state.questions[state.currentQuestion].options[key]}
                                        </button>
                                    </div>
                                );
                            }
                        }
                    }) : <p></p>}
                </div>

                {/* If any problem, display it */}
                {state.problem.status ? 
                    <div className='error'>{state.problem.message}</div>
                : <p></p>    
                }
            </div>

            <div>
                {/* Navigation and Submit Buttons */}
                <div className="btn-bottom">
                    {state.currentQuestion === 0 ? (
                        <button
                            disabled={true}
                            id="disabled-btn"
                        >
                            Previous
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                gotoPreviousQuestion();
                            }}
                        >
                            Previous
                        </button>
                    )}
                    {state.currentQuestion === state.questions.length-1 ? (
                        <button
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                gotoNextQuestion();
                            }}
                        >
                            Next
                        </button>
                    )}
                    <Modal
                        show={state.showModal}
                        onHide={hideModal}
                        submitQuiz={onConfirm}
                    />
                </div>
                <div className="timer">
                    <Timer initialMinute={initialMinute} initialSecond={initialSecond} onEnd={onConfirm}/>
                </div>
            </div>
        </div>
    )
}

export default TechQuiz