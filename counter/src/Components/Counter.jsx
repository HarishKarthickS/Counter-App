import { useEffect, useRef, useState } from 'react'
import './Counter.css'
function Counter() {
    const [isActive,setIsActive] = useState(false) 
    const [isPaused,setIsPaused] = useState(false)
    const [isStop,setIsStop] = useState(false)
    const [time,setTime] = useState(0)
    const [color,setColor]=useState('#fff')
    // const time = useRef(0)
    function setCookie(name, value, daysToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        document.cookie =
          name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }
    // function getCookie(name) {
    //   let cookieArray = document.cookie.split('; ');
    //   let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    //   return cookie
    // }
    useEffect(()=>{
        let interval = 0;
        
        
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
                setCookie('time',time,1)
                // console.log(getCookie("time"))
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    
    },[isActive,isStop,isPaused])
    const startTimer=()=>{
        setIsActive(true)
        setIsPaused(false)
        setIsStop(false)
    }
    const stopTimer=()=>{
        setIsActive(false);
        setCookie('time',time,0)
    }
    const pauseTimer=()=>{
        setIsPaused(!isPaused)
    }
  return (
    <>
        <div id='counter' style={{backgroundColor:{}}}>
            <h1 id='title'>Counter</h1>
            <div id='timer'>
                <span>{time}</span>
            </div>
            <div id='option'>
                <button id='start' onClick={startTimer}>Play</button>
                <button id='stop' onClick={stopTimer}>Stop</button>
                <button id='pause' onClick={pauseTimer}>Pause</button>
            </div>
        </div>
    </>
  )
}

export default Counter