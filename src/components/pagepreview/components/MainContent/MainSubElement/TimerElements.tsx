// import type { NextPage } from 'next'
import { Fragment } from 'react'
import TimerAtom from '../../../components/Atoms/ElementsAtoms/TimerAtom';
import styles from './MainSubElement.module.css';
import Countdown, { CountdownApi } from 'react-countdown';
import { generateClassNameStr, generateChildClassNameStr } from "../../../../../utils/functions";

interface Prop {
  type:string;
  props:any;
  refBtn:any;
  // onClick:()=>void;
}

interface CountdownType {
  days:number;
  hours:number;
  minutes:number;
  seconds:number;
}

const TimerElements = ({type, props, refBtn}:Prop) => {

  const time = (props?.timerGeneralData?.countdownType === 'evergreen') ? (props?.timerGeneralData?.endDate) : (props?.timerGeneralData?.endMinutesDate);

  const renderer = ({days, hours,minutes,seconds}:CountdownType) => {
    return (
      <div className={styles.timerContainer}>
        <TimerAtom labelName={props?.timerLabel?.daysLabel} lableValue={days} {...props} />
        <TimerAtom labelName={props?.timerLabel?.hoursLabel} lableValue={hours} {...props} />
        <TimerAtom labelName={props?.timerLabel?.minutesLabel} lableValue={minutes} {...props} />
        <TimerAtom labelName={props?.timerLabel?.secondsLabel} lableValue={seconds} {...props} />
      </div>
    )
  }

  const completeTimer = () => {
    if(typeof window !== "undefined" && props?.timerGeneralData?.redirectUrl) window.location = (props?.timerGeneralData?.redirectUrl);
  }
  
  const parentStyle = {
    textAlign:'center' as const,
  }

  const styleSelectorName = generateClassNameStr(props?.styleClasses);

  return (
    <Fragment>
      <div ref={refBtn} style={{...parentStyle}} className={`${styleSelectorName}`}>
        <Countdown
          controlled={false}
          renderer={renderer}
          date={time ? time : Date.now()}
          daysInHours={false}
          autoStart={true}
          onComplete={completeTimer} 
        />
      </div>
    </Fragment>
  )
}

export default TimerElements;
