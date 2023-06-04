import { useState, useEffect } from "react"

const Rough = () => {

    const [time, setTime] = useState({minutes: 10, seconds: 0})
    const update = () => {
        if(time.seconds === 0){
            if(time.minutes !== 1){
                setTime({ minutes: time.minutes-1, seconds: 59 })
            }
        }
        else{
            setTime({ ...time, seconds: time.seconds-1 })
        }
    }

    // eslint-disable-next-line
    useEffect(function(){setTimeout(update,1000)}, [time])

    return (
        <div style={{margin: '50px'}}>
            <h1>Timer component bitch</h1>
            <h2>{time.minutes} : {time.seconds}</h2>
        </div>
    )
}

export default Rough