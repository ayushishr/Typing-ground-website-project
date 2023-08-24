import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth, db } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {
        const [data,setData]=useState([]);
        const [graphData,setGraphData]=useState([])
        const [user,Loading]=useAuthState(auth);
        const [dataLoading, setDataLoding]=useState(true);
        

    const navigate=useNavigate();

        const fetchUserdata=()=>{
        const resultsRef=db.collection("Result");
console.log(resultsRef);
        const {uid}= auth.currentUser;
        console.log(uid)
            let tempData=[];
            let tempGraphData=[];
        resultsRef
        .where("userId",'==',uid)
        .orderBy('timeStamp','desc')
        .get()
        .then((snapshot)=>{
            console.log("snapshot")
            snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
                doc.data().wpm])
            })
            setData(tempData);
            console.log(data)
            setGraphData(tempGraphData.reverse());
            setDataLoding(false)
        }).catch((error) => {
            console.error('Error fetching user data:', error);
          });
    }
    useEffect(()=>{
        if(!Loading){
        fetchUserdata();
        }
        if(!Loading && !user)
        {
        navigate('/');
        }
    },[Loading])

        if(Loading || dataLoading){
        return <div className='center-of-screen'>
            <CircularProgress size={100}/>
            </div>
        }
  return (
    <div className='canvas'>
        <UserInfo totalTestTaken={data.length}/>
        <div className='graph-user-page'>
        <Graph graphData={graphData}/>
        </div>
       
      <TableUserData data={data}/>
    </div>
  )
}

export default UserPage
