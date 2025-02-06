import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

const InterviewItemCard = ({interview}) => {
    const router=useRouter();
    const onstart=()=>{
        router.push('/dashboard/interview/'+interview.mockId)

    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
    const deleteInterview=async(interview)=>{

      await deleteMockInterviewById(interview.id)


      
    }

async function deleteMockInterviewById(id) {
  await db.delete(MockInterview).where(eq(MockInterview.id, id));
  toast.success('Mock interview deleted successfully');
  console.log(`Deleted mock interview with ID: ${id}`);
}
  return (
    <div className='p-3 border rounded-lg shadow-sm'>
        <h2 className='font-bold text-primary '>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview.jobExperience}Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At:{interview.createdAt}</h2>
    <div className="flex justify-between gap-5 mt-2">
    <Button onClick={onFeedbackPress} size="sm" variant="outline" className="w-full">Feedback</Button>
    <Button onClick={onstart} size="sm" className="w-full">Start</Button>
    <Button onClick={deleteInterview(interview)} size="sm" variant="outline" className="w-full">Delete</Button>
    </div>

    </div>
  )
}

export default InterviewItemCard