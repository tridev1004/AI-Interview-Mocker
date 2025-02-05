import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {
    const router=useRouter();
    const onstart=()=>{
        router.push('/dashboard/interview/'+interview.mockId)

    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
  return (
    <div className='p-3 border rounded-lg shadow-sm'>
        <h2 className='font-bold text-primary '>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview.jobExperience}Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At:{interview.createdAt}</h2>
    <div className="flex justify-between gap-5 mt-2">
    <Button onClick={onFeedbackPress} size="sm" variant="outline" className="w-full">Feedback</Button>
    <Button onClick={onstart} size="sm" className="w-full">Start</Button>
    </div>

    </div>
  )
}

export default InterviewItemCard