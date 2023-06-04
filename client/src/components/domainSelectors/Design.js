// Import hooks and packages
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

// Import components
import Loader from "../Loader";

// Import assets
import Info from "@mui/icons-material/Info"
import Architecture from "@mui/icons-material/Architecture"
import PhoneAndroid from "@mui/icons-material/PhoneAndroid"
import Theaters from "@mui/icons-material/Theaters"
import ViewInAr from '@mui/icons-material/ViewInAr';

/* ---------------------------------------------------------------- */

const getUser = async (navigate, setUser) => {
    try{
        const res = await axios.get('/api/auth/authorize')
        setUser(res.data)
    }
    catch(err){
        console.log(err.response.data)
        navigate('/')
    }
}

/* ---------------------------------------------------------------- */

const Design = () => {
    const [user, setUser] = useState(false)
    const [domain, setDomain] = useState(false)

    const navigate = useNavigate()
    useEffect(function(){ 
        getUser(navigate, setUser)                   // eslint-disable-next-line
    },[])

    const domainValue = (e) => {
        setDomain(e.target.value)
    }

    let poster, uiux, video, threed
    if(user){
        poster = user.attemptedDomains.poster
        uiux = user.attemptedDomains.uiux
        video = user.attemptedDomains.video
        threed = user.attemptedDomains.threed
    }

    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="domainPage">
            <div className="mainForm">
                <h1 className="heading">Choose a Subdomain</h1>
                <p className="para">Select a subdomain and start quiz</p>
                <div className="domains">
                    <div onChange={domainValue}>

                        {/* Poster */}
                        <div className={poster || uiux ? 'domainRowDead' : 'domainRow'}>
                            <Architecture style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Poster</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='poster' name='selection' id='design-poster' disabled={poster || uiux}></input>
                        </div>

                        {/* UI UX */}
                        <div className={poster || uiux ? 'domainRowDead' : 'domainRow'}>
                            <PhoneAndroid style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">UI & UX</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='uiux' name='selection' id='design-uiux' disabled={poster || uiux}></input>
                        </div>

                        <div style={{borderBottom: '1px solid #424242', marginTop: '7px'}}></div>


                        {/* Video Editing */}
                        <div className={video ? 'domainRowDead' : 'domainRow'}>
                            <Theaters style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Video Editing</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='video' name='selection' id='design-video' disabled={video}></input>
                        </div>

                        {/* 3D Design */}
                        <div className={threed ? 'domainRowDead' : 'domainRow'}>
                            <ViewInAr style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">3D Design</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='threed' name='selection' id='design-threed' disabled={threed}></input>
                        </div>

                    </div>
                </div>
                <Link
                    to={`${domain ? '/instructions' : '/technical'}`}
                    state={{domain: 'design', subdomain: domain}}
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
                        <li><p>There are <b style={{color: 'yellow'}}>2 exclusive</b> domains and <b style={{color: 'yellow'}}>2 non-exclusive</b> domains</p></li>
                        <li><p>You can give a test for <b style={{color: 'yellow'}}>either poster or UI & UX, not both</b></p></li>
                        <li><p>You can give the tests for all the remaining 2 domains, provided you have time</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Design