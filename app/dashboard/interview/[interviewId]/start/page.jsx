"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_component/QuestionsSection';
import RecordAnsSection from './_component/RecordAnsSection';

const StartInterview = ({params}) => {
    const [interviewData, setInterviewData]=useState();
    const[mockInterviewQuestion,setmockInterviewQuestion]=useState();
    const[activeQuestionIndex, setActiveQuestionIndex]=useState(0); 
    useEffect(()=>{
    console.log(params.interviewId);
             
        GetInterviewDetails();

    },[])
     // fetching interview details by mockID/interviewID
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      

      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    const jsonMockResp=JSON.parse(result[0].jsonMockResp)
    console.log(jsonMockResp);
    
    setmockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* {Questions} */}
            <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}/>
            {/* {video / audio recording} */}

             <RecordAnsSection/>



        </div>
    </div>
  )
}

export default StartInterview