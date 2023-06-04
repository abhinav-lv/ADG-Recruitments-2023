// Import hooks and packages
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

// Import components
import Loader from "../Loader";

// Import assets
import Info from "@mui/icons-material/Info"
import Science from "@mui/icons-material/Science"
import Layers from "@mui/icons-material/Layers"

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

const Project = () => {
    const [user, setUser] = useState(false)
    const [domain, setDomain] = useState(false)

    const navigate = useNavigate()
    useEffect(function(){ 
        getUser(navigate, setUser)                   // eslint-disable-next-line
    },[])

    const domainValue = (e) => {
        setDomain(e.target.value)
    }

    let research, project, attempted
    if(user){
        research = user.attemptedDomains.rnd
        project = user.attemptedDomains.projMgmt
    }
    attempted = project || research

    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="domainPage">
            <div className="mainForm">
                <h1 className="heading">Choose a Subdomain</h1>
                <p className="para">Select a subdomain and start quiz</p>
                <div className="domains">
                    <div onChange={domainValue}>

                        {/* R & D */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <Science style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Research (R & D)</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='rnd' name='selection' id='project-rnd' disabled={attempted}></input>
                        </div>

                        {/* Project Management */}
                        <div className={attempted ? 'domainRowDead' : 'domainRow'}>
                            <Layers style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Project Management</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='projMgmt' name='selection' id='projMgmt' disabled={attempted}></input>
                        </div>
                    </div>
                </div>
                <Link
                    to={`${domain ? '/instructions' : '/technical'}`}
                    state={{domain: 'project', subdomain: domain}}
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
                        <li><p>The project domain comprises entirely of <b style={{color: 'yellow'}}>exclusive</b> subdomains</p></li>
                        <li><p>You can give a test for <b style={{color: 'yellow'}}>either research or project management, not both</b></p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Project