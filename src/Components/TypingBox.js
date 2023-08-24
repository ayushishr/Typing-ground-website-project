import { create } from '@mui/material/styles/createTransitions';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useTestMode } from '../Context/TestModeContext';
import UpperMenu from './UpperMenu';
import Stats from './Stats';


var randomWords= require('random-words');

const TypingBox = () => {

      const inputRef=useRef(null);
      const{testTime}=useTestMode();
      const[countDown,setCountDown]=useState(testTime);
      const[intervalId,setIntervalId]=useState(null)
      const[testStart,setTestStart]=useState(false);
      const[testEnd,setTestEnd]=useState(false);
      const[correctChars,setCorrectChars]=useState(0);
      const[incorrectChars,setInCorrectChars]=useState(0);
      const[missedChars,setMissedChars]=useState(0);
      const[extraChars,setExtraChars]=useState(0);
      const[correctWords,setCorrectWords]=useState(0);
      const[wordsArray,setWordsArray]=useState(()=>{
        return randomWords(50);
      })
      
        const[currWordIndex,setCurrWordIndex]=useState(0);
        const[currCharIndex,setCurrCharIndex]=useState(0);
        const[graphData,setGraphData]=useState([]);


       const wordsSpanRef=useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null))
       },[wordsArray])
     
      const startTimer=()=>{
        const intervalId=setInterval(timer,1000);
        setIntervalId(intervalId);

        function timer(){
          setCountDown((LatestCountDown)=>{
            setCorrectChars((correctChars)=>{
              setGraphData((graphData)=>{
              return[...graphData,[
                testTime-LatestCountDown+1,
                (correctChars/5)/((testTime-LatestCountDown+1)/60)
              ]];
              })
              return correctChars;
            })
            if(LatestCountDown===1)
            {
              setTestEnd(true);
              clearInterval(intervalId);
              return 0;
            }
            return LatestCountDown-1;
          })
        }
      }

      const resetTest=()=>{
        clearInterval(intervalId)
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords(50))
        resetWordSpanRef();
        focusInput()

      }
      const resetWordSpanRef=()=>{
        wordsSpanRef.forEach(i=>{
          if (i.current !== null) {
          Array.from(i.current.childNodes).map((j)=>{
            j.className=" ";
          });
          if(i.current.childNodes.length > 0)
          {
            wordsSpanRef[0].current.childNodes[0].className='current';
          }
        }
      })
     
    }

      const focusInput=()=>{
        inputRef.current.focus();
    }




      const handleUserInput=(e)=>{
        
        if(!testStart)
        {
          startTimer();
          setTestStart(true);
        }

  const allCurrChars= wordsSpanRef[currWordIndex].current?.childNodes;
  if (!allCurrChars) {
    return;
  }
  if (e.keyCode === 32) {

let correctCharsInWords=wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
if(correctCharsInWords.length===allCurrChars.length)
{
  setCorrectWords(correctWords+1);
}
    // Logic for space and space key code is 32
    if (allCurrChars.length<= currCharIndex) 
    {
    //remove cursor from last place in a word
    allCurrChars [currCharIndex-1].classList.remove('current-right');
    }
    //remove cursor  in betwswen
    else{
      setMissedChars(missedChars+(allCurrChars.length-currCharIndex))
      allCurrChars [currCharIndex].classList.remove('current');
    }
        wordsSpanRef [currWordIndex+1].current.childNodes[0].className = 'current';
        setCurrWordIndex(currWordIndex+1);
        setCurrCharIndex(0);
        return;
  }

  //key code backspacae is 8

  if(e.keyCode===8)
  {
    if(currCharIndex!==0)
    {
      if(allCurrChars.length=== currCharIndex)
      {
        if(allCurrChars[currCharIndex-1].className.includes('extra')){
          allCurrChars[currCharIndex-1].remove();
          allCurrChars[currCharIndex-2].className+=' current-right';
        }
        else{
          allCurrChars[currCharIndex-1].className='current';
        }
       
        setCurrCharIndex(currCharIndex-1)
        return;
      }
        allCurrChars[currCharIndex].className='';
        allCurrChars[currCharIndex-1].className='current';
        setCurrCharIndex(currCharIndex-1);
    }
    return;
  }


      if(currCharIndex===allCurrChars.length)
      {
        let newSpan=document.createElement('span');
        newSpan.innerText=e.key;
        newSpan.className='Incorrect extra current-right';
        allCurrChars[currCharIndex-1].classList.remove('current-right')
        wordsSpanRef[currWordIndex].current.append(newSpan);
        setCurrCharIndex(currCharIndex+1);
        setExtraChars(extraChars+1);
        return;
      }


     if(e.key === allCurrChars[currCharIndex].innerText)
     {
      allCurrChars[currCharIndex].className='correct';
      setCorrectChars(correctChars+1);
     }
      else
      {
        allCurrChars[currCharIndex].className='Incorrect'
        setInCorrectChars(incorrectChars+1)
      }

      if(currCharIndex+1 === allCurrChars.length)
      {
        allCurrChars[currCharIndex].className +=' current-right';
      }
      else{
        allCurrChars[currCharIndex+1].className='current';
      }
      //to move to nxt char
   
      setCurrCharIndex(currCharIndex+1);
   }

   //words per minute

   const calculateWPM=()=>{
    return Math.round((correctChars/5)/(testTime/60))
   }
   
   //accuracy
   const calculateAcc=()=>{
    return Math.round((correctWords/currWordIndex)*100)
   }
    
      useEffect(()=>{
      resetTest();
      },[testTime])

      useEffect(()=>{
        focusInput();
     
        wordsSpanRef[0].current.childNodes[0].className='current';
      },[])
  

  return (
  <div>
    <UpperMenu countDown={countDown}/>
    {(testEnd)?(<Stats
     wpm={calculateWPM()} 
      accuracy={calculateAcc()} 
       correctChars={correctChars}
       incorrectChars={incorrectChars}
       missedChars={missedChars}
      extraChars={extraChars}
      graphData={graphData}
      resetTest={resetTest}  
      //add this new 228 line
      />
     
     ):(
     <div className='type-box' onClick={focusInput}>
         <div className='words'>
              {
                  wordsArray.map((word,index)=>
                  (
                      <span className='word' ref={wordsSpanRef[index]} key={index}> 
                    {  
                        word.split('').map((char,charIndex)=>
                        (
                            <span key={charIndex}>{char}</span>
                        ))
                    }
                      </span>
                  ))
               } 
         </div>
    </div>)}
    <input type='text' ref={inputRef} className='hiden' onKeyDown={handleUserInput} />
    </div>
  )
}

export default TypingBox
