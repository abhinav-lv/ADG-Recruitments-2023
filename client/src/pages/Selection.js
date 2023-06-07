// Import hooks and packages
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import assets
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Engineering from "@mui/icons-material/Engineering"
import Alarm from "@mui/icons-material/Alarm"

// Import components
import Loader from "../components/Loader";

/* ---------------------------------------------------------------- */

// Authorize user with server
const authorizeUser = async (navigate, setUser) => {
    try{
        // const res = await axios.get(`${process.env.REACT_APP_SERVER_URL+'/auth/authorize'}`, {withCredentials: true})
        const res = await axios.get('/api/auth/authorize')
        // console.log(res.data)
        setUser(res.data)
    }
    catch(err){
        console.error(err)
        navigate('/')
    }
}

/* ---------------------------------------------------------------- */

// Selection Page
const Selection = () => {

    const navigate = useNavigate() 
    const [user, setUser] = useState(false)                     // eslint-disable-next-line
    useEffect(function(){authorizeUser(navigate, setUser)},[])

    const [domain, setDomain] = useState(false)

    const domainValue = (e) => {
        setDomain(e.target.value)
    }

    let bleh, tech, man, proj, des, remainingTime
    if(user){
        bleh = user.attemptedDomains
        tech = bleh.ios || bleh.web || bleh.android || bleh.ml || bleh.blockchain
        man = (bleh.marketing || bleh.editorial) && bleh.sponsorship && bleh.operations && bleh.logistics
        proj = bleh.rnd || bleh.projMgmt 
        des = (bleh.poster || bleh.uiux) && bleh.video && bleh.threed
        remainingTime = JSON.parse(user.test.remainingTime)
    }

    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="domainPage">
            <div style={{display: 'flex', width: '90%', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                <div className="mainForm">
                    <h1 className="heading">Choose a Domain</h1>
                    <p className="para">Then proceed to view respective subdomains</p>
                    <div className="domains">
                        {/* <div onChange={domainValue}> */}
                        <div onChange={domainValue}>

                            {/* Technical */}
                            <div className={tech ? 'domainRowDead' : 'domainRow'}>
                                <PrecisionManufacturingIcon style={{ fontSize: 55 }} />
                                <div style={{marginLeft: '10px'}} className="info">
                                    <h1 className="heading">Technical</h1>
                                    <p className="para">10 Questions . 10 mins . Objective Type</p>
                                </div>
                                <input type='radio' value='Technical' name='selection' id='technical' disabled={tech}></input>
                            </div>
                                
                            {/* Management */}
                            <div className={man ? 'domainRowDead' : 'domainRow'}>
                                <AssessmentIcon style={{ fontSize: 55 }} />
                                <div style={{marginLeft: '10px'}} className="info">
                                    <h1 className="heading">Management</h1>
                                    <p className="para">5 Questions . No Time . Subjective Type</p>
                                </div>
                                <input
                                    type='radio'
                                    value='Management'
                                    name='selection'
                                    id='management'
                                    disabled={man}
                                    className="input">
                                </input>
                            </div>

                            {/* Project */}
                            <div className={proj ? 'domainRowDead' : 'domainRow'}>
                                <Engineering style={{ fontSize: 55 }} />
                                <div style={{marginLeft: '10px'}} className="info">
                                    <h1 className="heading">Project</h1>
                                    <p className="para">10 Questions . 10 mins . Objective Type</p>
                                </div>
                                <input
                                    type='radio'
                                    value='project'
                                    name='selection'
                                    id='project'
                                    disabled={proj}
                                    className="input">
                                </input>
                            </div> 


                            {/* Design */}
                            <div className={des ? 'domainRowDead' : 'domainRow'}>
                                <ColorLensIcon style={{ fontSize: 55 }} />
                                <div style={{marginLeft: '10px'}} className="info">
                                    <h1 className="heading">Design</h1>
                                    <p className="para">10 Questions . 10 mins . Objective Type</p>
                                </div>
                                <input
                                    type='radio'
                                    value='Design'
                                    name='selection'
                                    id='design'
                                    disabled={des}
                                    className="input">
                                </input>
                            </div> 
                        </div>
                    </div>
                    <Link
                        to={`${domain ? '/'+domain.toLowerCase() : '/selection'}`}
                        state={{domain: domain}}
                        style={{marginTop: '25px', marginBottom: '-10px'}}
                        className={`btn1`}
                    >
                        Proceed
                    </Link>
                </div>
                {/* Component for showing remaining time */}
                <div className="mainForm">
                    <div style={{display: "flex", gap: "15px", alignItems: "center"}}>
                        <Alarm style={{fontSize: 30, color: 'yellow'}} />
                        <p style={{fontSize: '18px', fontWeight: 'bold', color:'gainsboro'}}>Remaining Time</p>
                    </div>
                    <p  style={{fontSize: '22px', fontWeight: 'bold'}}>{`${remainingTime[0]}m ${remainingTime[1]}s`}</p>
                </div>
            </div>
        </div>
    )
}

export default Selection