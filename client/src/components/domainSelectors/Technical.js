// Import hooks and packages
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

// Import components
import Loader from '../Loader'

// Import assets
import Info from "@mui/icons-material/Info"
import Apple from "@mui/icons-material/Apple";
import Language from "@mui/icons-material/Language";
import ADB from "@mui/icons-material/Adb";
import Psychology from "@mui/icons-material/PsychologyAlt";
import BitCoin from '@mui/icons-material/CurrencyBitcoin';

/* ---------------------------------------------------------------- */

const getUser = async (navigate, setUser) => {
    try{
        const res = await axios.get('/api/auth/authorize')
        console.log(res.data)
        setUser(res.data)
    }
    catch(err){
        console.log(err.response.data)
        navigate('/')
    }
}

/* ---------------------------------------------------------------- */

const Technical = () => {

    const [user, setUser] = useState(false)
    const [domain, setDomain] = useState(false)

    const navigate = useNavigate()
    useEffect(function(){ 
        getUser(navigate, setUser)                   // eslint-disable-next-line
    },[])

    const domainValue = (e) => {
        setDomain(e.target.value)
    }

    let ios, web, android, ml, blockchain, attempted
    if(user){
        ios = user.attemptedDomains.ios
        web = user.attemptedDomains.web
        blockchain = user.attemptedDomains.blockchain
        android = user.attemptedDomains.android
        ml = user.attemptedDomains.ml
    }
    attempted = ios || web || android || ml || blockchain

    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="domainPage">
            <div className="mainForm">
                <h1 className="heading">Choose a Subdomain</h1>
                <p className="para">Select a subdomain and start quiz</p>
                <div className="domains">
                    <div onChange={domainValue}>

                        {/* iOS */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <Apple style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">iOS</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='ios' name='selection' id='technical-ios' disabled={attempted}></input>
                        </div>

                        {/* Web */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <Language style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Web</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='web' name='selection' id='technical-web' disabled={attempted} className="input"></input>
                        </div>

                        {/* Blockchain */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <BitCoin style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Blockchain</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='blockchain' name='selection' id='technical-blockchain' disabled={attempted} className="input"></input>
                        </div> 
                            
                        {/* Android */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <ADB style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Android</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='android' name='selection' id='technical-android' disabled={attempted} className="input"></input>
                        </div> 

                        {/* Machine Learning */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <Psychology style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Machine Learning</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='ml' name='selection' id='technical-ml' disabled={attempted} className="input"></input>
                        </div> 
                    </div>
                </div>
                <Link
                    to={`${domain ? '/instructions' : '/technical'}`}
                    state={{domain: 'technical', subdomain: domain}}
                    style={{marginTop: '25px', marginBottom: '-10px'}}
                    className={`btn1`}
                >
                    Start Quiz
                </Link>
            </div>
            <div className="disclaimer-box">
                <div className="disclaimer">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Info style={{marginRight: '10px', color: 'yellow'}}/>
                        <h1>Disclaimer</h1>
                    </div>
                    <ul style={{marginLeft: '10px'}}>
                        <li><p>The technical domain comprises entirely of <b style={{color: 'yellow'}}>exclusive</b> subdomains</p></li>
                        <li><p>You can only be part of one of these subdomains on the left</p></li>
                        <li><p>You will be able to take a test for <b style={{color: 'yellow'}}>only one of them</b></p></li>
                        <li><p>You are effectively choosing the domain that you want to be in</p></li>
                        <li><p>So choose your domain wisely, <b style={{color: 'yellow'}}>you won't be able to change it later</b></p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Technical