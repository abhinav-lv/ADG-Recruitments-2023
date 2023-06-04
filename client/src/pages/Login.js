// Import hooks and packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// Import components
import Loader from '../components/Loader';

// Import assets
import back_img from "../assets/img/back_img_main.svg";

/* ---------------------------------------------------------------- */

// const config = {
//     withCredentials: true,
// }

// Authorize user with server
const authorizeUser = async (navigate, setLoaded) => {
    try{
        await axios.get('/api/auth/authorize')
        navigate('/selection')
    }
    catch(err){
        setLoaded(true)
        // console.log(err.response.data)
    }
}

/* ---------------------------------------------------------------- */

// Login Page
const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        status: 0,      // initally, before request to server
        message: '',
        regNo: '',
        yearOfStudy: 0
    })
    const [inputs, setInputs] = useState({
        regNo: '',
        password: ''
    })
    const [loaded, setLoaded] = useState()

    // eslint-disable-next-line
    useEffect(function(){authorizeUser(navigate, setLoaded)},[])

    const handleChange = (e) => {
        const name = e.target.name
        const value = (name === "regNo") 
                        ? e.target.value.toUpperCase() 
                        : e.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (e) => {
        try{
            // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL+'/auth/authenticate'}`,{
            //     regNo: inputs.regNo,
            //     password: inputs.password
            // },config)
            const res = await axios.post('/api/auth/authenticate', {
                regNo: inputs.regNo,
                password: inputs.password
            })
            console.log(res)
            setUser({
                status: 1,      // authenticated successfully
                message: 'authenticated',
                regNo: res.data.regNo, 
                yearOfStudy: res.data.yearOfStudy
            })
            navigate('/selection')
        }
        catch(err){
            if(err?.response?.status === 403){
                setUser({
                    ...user,
                    status: 2,      // invalid credentials
                    message: err?.response?.data,
                })
            }
        }
    }

    if(!loaded) return <Loader/>
    else return (
        <div className="login_page">
            <div className="left">
                <div className="main_form">
                    <h1 className="heading">Login</h1>
                    <p className="para">
                        Login with your VIT Registration Number
                    </p>

                    {/* Registration Number field */}
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter Registration Number"
                        name='regNo'
                        value={inputs.regNo}
                        onChange={handleChange}
                    />

                    {/* Password field */}
                    <input
                        className="input"
                        type={"password"}
                        placeholder="Enter Your Password"
                        name="password"
                        value={inputs.password}
                        style={{
                            marginBottom: 10,
                            position: "relative",
                        }}
                        onChange={handleChange}
                    />

                    {/* If wrong credentials, enable this */}
                    {user.status === 2 
                        ?   <div className="error">
                                {user.message}
                            </div>
                        :   <p></p>
                    }

                    {/* Submit button */}
                    <div className="btn1" onClick={handleSubmit}>
                        Log In
                    </div>
                </div>
            </div>
            <div className="right">
                <img alt="background" src={back_img} />
            </div>
        </div>
    )
}

export default Login