// Import hooks and packages
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import global styles
import '../styles/global.css'

// Import components
import Loader from '../components/Loader'

// Import assets
import Portal from "../assets/img/Portal.svg"
import back_img from "../assets/img/back_img_main.svg";
import adglogo from "../assets/img/adg_logo.svg";

/* ---------------------------------------------------------------- */

// Landing page
const Landing = () => {

    const [loaded, setLoaded] = useState(false)

    useEffect(function(){
        setLoaded(true)
    },[])

    if(!loaded) return <Loader/>
    else return (
        <div className="landing_page">
            <div className="left">
                <div className="navbar">
                    <img id="adglogo" src={adglogo} alt="ADG Logo" />
                </div>
                <div style={{marginBottom: '70px'}} className="info">
                    <h1>ADG VIT</h1>
                    <p className="heading1">Recruitments</p>
                    <img src={Portal} alt="Portal" className="portal_img" />
                    <p className="para">
                        Have a dream to become techie? Let's begin now.
                    </p>
                    <Link to="/login">
                        <button style={{marginTop: '20px'}} className="btn1"> Login </button>
                    </Link>
                </div>
            </div>
            <div className="right">
                <img alt="background" src={back_img} />
            </div>
        </div>
    )
}

export default Landing