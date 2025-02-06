import { text } from "drizzle-orm/mysql-core";
import { Lightbulb, LightbulbIcon, Volume2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const QuestionsSection = ({ mockInterviewQuestion=[], activeQuestionIndex }) => {
    const textToSpeech =(text)=>{
       if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech)
       } else{
        toast.error('Sorry,Your Browser does not support text to Speech')
       }
    }
    console.log(mockInterviewQuestion)
  return (
    <div className="p-5 my-10 border rounded-lg">
      <div className="grid gap-5 gird-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <div key={index}>
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                Question #{index + 1}
              </h2>

            </div>
          ))}

      </div>
      <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.q)}/>

      
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.q}</h2>
           <div className="p-5 mt-20 bg-blue-100 border rounded-lg"> 
            <h2 className="flex items-center gap-2 text-primary">
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="my-2 text-sm text-primary">{process.env.NEXT_PUBLIC_INFORMATION}</h2>

           </div>
    </div>
  );
};

export default QuestionsSection;
