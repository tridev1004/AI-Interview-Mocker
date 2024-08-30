import { Lightbulb, LightbulbIcon } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestion=[], activeQuestionIndex }) => {
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.Question}</h2>
           <div className="border rounded-lg p-5 bg-blue-100 mt-20"> 
            <h2 className=" flex gap-2 items-center text-primary">
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_INFORMATION}</h2>

           </div>
    </div>
  );
};

export default QuestionsSection;
