// Import hooks and packages
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

// Import components
import Loader from "../Loader";

// import assets
import People from "@mui/icons-material/People"
import Edit from "@mui/icons-material/Edit"
import AttachMoney from "@mui/icons-material/AttachMoney"
import Fax from "@mui/icons-material/Fax"
import LocalShipping from "@mui/icons-material/LocalShipping"
import Info from "@mui/icons-material/Info"

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

const Management = () => {

    const [user, setUser] = useState(false)
    const [domain, setDomain] = useState(false)

    const navigate = useNavigate()
    useEffect(function(){ 
        getUser(navigate, setUser)                   // eslint-disable-next-line
    },[])

    const domainValue = (e) => {
        setDomain(e.target.value)
    }

    let marketing, editorial, sponsorship, operations, logistics
    if(user){
        marketing = user.attemptedDomains.marketing
        editorial = user.attemptedDomains.editorial
        sponsorship = user.attemptedDomains.sponsorship
        operations = user.attemptedDomains.operations
        logistics = user.attemptedDomains.logistics
    }
    
    return !user ? <Loader/> : (
        <div style={{height: '100vh'}} className="domainPage">
            <div className="mainForm">
                <h1 className="heading">Choose a Subdomain</h1>
                <p className="para">Select a subdomain and start quiz</p>
                <div className="domains">
                    <div onChange={domainValue}>

                        {/* Social Media and Marketing */}
                        <div className={marketing || editorial ? 'domainRowDead' : 'domainRow'}>
                            <People style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Marketing</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='marketing' name='selection' id='management-marketing' disabled={marketing || editorial}></input>
                        </div>

                        {/* Editorial */}
                        <div className={marketing || editorial ? 'domainRowDead' : 'domainRow'}>
                            <Edit style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Editorial</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='editorial' name='selection' id='management-editorial' disabled={marketing || editorial}></input>
                        </div>

                        <div style={{borderBottom: '1px solid #424242', marginTop: '7px'}}></div>

                        {/* Sponsorship and Collaboration */}
                        <div className={sponsorship ? 'domainRowDead' : 'domainRow'}>
                            <AttachMoney style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Sponsorship</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='sponsorship' name='selection' id='management-sponsorship' disabled={sponsorship}></input>
                        </div>

                        {/* Operations */}
                        <div className={operations ? 'domainRowDead' : 'domainRow'}>
                            <Fax style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Operations</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='operations' name='selection' id='management-operations' disabled={operations}></input>
                        </div>
                        
                        {/* Logistics */}
                        <div className={logistics ? 'domainRowDead' : 'domainRow'}>
                            <LocalShipping style={{ fontSize: 55 }} />
                            <div style={{marginLeft: '10px'}} className="info">
                                <h1 className="heading">Logistics</h1>
                                <p className="para">10 Questions . 10 mins . Objective Type</p>
                            </div>
                            <input type='radio' value='logistics' name='selection' id='management-logistics' disabled={logistics}></input>
                        </div>
                    </div>
                </div>
                <Link
                    to={`${domain ? '/instructions' : '/management'}`}
                    state={{domain: 'management', subdomain: domain}}
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
                        <li><p>There are <b style={{color: 'yellow'}}>2 exclusive</b> domains and <b style={{color: 'yellow'}}>3 non-exclusive</b> domains</p></li>
                        <li><p>You can give a test for <b style={{color: 'yellow'}}>either marketing or editorial, not both</b></p></li>
                        <li><p>You can give the tests for all the remaining 3 domains, provided you have time</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Management