import React from "react";
import { useState, useEffect } from "react";

import Alarm from "@mui/icons-material/Alarm"

const Timer = ({initialMinute, initialSecond, onEnd}) => {
    const [time, setTime] = useState({minutes: initialMinute, seconds: initialSecond, color: 'white'})
    const update = () => {
        if(time.seconds === 0){
            if(time.minutes !== 0){
				setTime({ ...time, minutes: time.minutes-1, seconds: 59})
            }
			else onEnd()
        }
        else{
			if(time.minutes < 1) setTime({...time, seconds: time.seconds-1, color: 'red'})		// eslint-disable-next-line
			else if(time.minutes < 5) setTime({...time, seconds: time.seconds-1, color: 'gold'})
            else setTime({ ...time, seconds: time.seconds-1 })
        }
    }

	// eslint-disable-next-line
    useEffect(function(){setTimeout(update,1000)}, [time])

    return (
        <div style={{margin: '50px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
				<Alarm style={{fontSize: 30}}/>
				<h2 style={{width: '70px', color: time.color}}>
					{`${time.minutes} : ${time.seconds < 10 ? "0"+time.seconds : time.seconds}`}
				</h2>
			</div>
        </div>
    )
};

export default Timer;
