// Import hooks and packages
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Import components
import Loader from '../components/Loader';

/* ---------------------------------------------------------------- */

// Authorize user with server
const authorizeUser = async (navigate, setUser, location) => {
    try{
        const res = await axios.get('/api/auth/authorize')
        
        const domains = location.state
        
        if(res.data.test.isTakingTest) navigate('/test', {state: {domain : domains.domain, subdomain: domains.subdomain}})
        else setUser(res.data)
    }
    catch(err){
        console.err(err.response.data)
        navigate('/')
    }
}

// Function to capitalize the first letter of a string
function capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

/* ---------------------------------------------------------------- */

// Instructions Page
const Instructions = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(false)
    useEffect(() => {                      
        if(!location.state) navigate('/selection') 
        else authorizeUser(navigate, setUser, location)           // eslint-disable-next-line
    },[])

    const domains = location.state

    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="instrCon">
            <div className="instrMain">
                <div className="instrLeft">
                    {`${capitalize(domains.subdomain)} Quiz`}
                </div>
                <div className="instrRight">
                    <div className='heading2'>
                        Instructions
                    </div>
                    <div className='sub-heading'>
                        Please read the instructions carefully before attempting the quiz
                    </div>
      
                    <ul style={{ textAlign: "left" }}>
                        <li>
                            The participant can attempt the quiz only ONCE.
                        </li>
                        {domains.domain === "Technical2" ? (null) : (
                        <li>
                            {
                            domains.domain === "Technical"
                            ? "The quiz will have 10 multiple choice questions."
                            : domains.domain === "Management"
                                ? "The quiz will have 5 Long Answer type questions."
                                : "The quiz will have 10 multiple choice questions."
                            }
                         </li>
                        )} 
                        {domains.domain === "Technical2" ? (null) : (
                         <li>
                            {
                            domains.domain === "Technical"
                            ? "10 minutes will be provided to complete the quiz."
                            : domains.domain === "Management"
                                ? "There is no time limit for completing the quiz."
                                : "10 minutes will be provided to complete the quiz."}
                        </li>
                        )}
                        {domains.domain === "Technical2" ? (
                        <li>
                            In case the participant tries to close the web portal or go back from the
                            quiz, the quiz will be auto submitted.
                         </li>
                        ) : (
                        <li>
                            In case the participant tries to close the web portal or go back from the
                            quiz, it shall be considered a case of malpractice and the quiz will be auto
                            submitted.
                        </li>
                        )}
                    </ul>
                    <Link 
                        to={'/test'}
                        state={{domain : domains.domain, subdomain: domains.subdomain}}
                        className='instrbtn1'
                    >
                        Start Test
                    </Link>
     
                </div>
            </div>
        </div>
    )
}

export default Instructions