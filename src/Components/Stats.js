import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../FirebaseConfig';
import { toast } from 'react-toastify';
const Stats=( 
   { wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    graphData,
    resetTest, //added this line latest
}
 ) =>{
    let timeSet=new Set();
    const newGraph=graphData.filter(i=>{
        if(!timeSet.has(i[0]))
        {
            timeSet.add(i[0])
            return i;
        }
    })

    const pushDataToDB=()=>{
        if(isNaN(accuracy)){
            toast.error('Invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
                return
           }
        
       const resultRef= db.collection('Result');
       const {uid}=auth.currentUser;
       resultRef.add({
        wpm:wpm,
        accuracy:accuracy,
        timeStamp: new Date(),
        Characters : `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId:uid
       }).then((res)=>{
        toast.success('Data Saved to DB', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "Dark",
            });
       }).catch((err)=>{
        toast.error('Not able to save result', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "Dark",
            });
       })
    }

    useEffect(()=>{
        if(auth.currentUser){
            pushDataToDB();
        }
        else{
            toast.warning('Login to save Result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });  
        }
    },[])
  return (
    <div className='stats-box'>
      <div className='left-stats'>
        <div className='title'>WPM</div>
        <div className='subtitle'>{wpm}</div>
        <div className='title'>Accuracy</div> 
        <div className='subtitle'>{accuracy}</div>
        <div className='title'>Characters</div>
        <div className='subtitle'>{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        <div onClick={resetTest} className='restart'>Restart</div> 
        {/* //added this line latest */}
      </div>
      <div className='right-stats'>
       <Graph graphData={newGraph}/>
      </div>
    </div>
  )
}

export default Stats
