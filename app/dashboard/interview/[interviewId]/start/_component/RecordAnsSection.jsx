"use cl";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Image, Mic } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
    
  }, [userAnswer]);
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
       console.log(userAnswer);
    
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);

    setLoading(true);
    const feedBackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.Question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and answer for given interview question" +
      ", please give us rating for answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback Field";

    const result = await chatSession.sendMessage(feedBackPrompt);

    const MockJsonResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .replace("**", "");
    console.log(MockJsonResp);
    const JsonFeedBackResp = JSON.parse(MockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      rating: JsonFeedBackResp?.rating,
      feedback: JsonFeedBackResp?.feedback,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    if (resp) {
      toast("User Answer Recorded Successfully");
      setUserAnswer('');
      setResults([]);
    }
    setResults([])
    
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {" "}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <img
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        disable={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
    </div>
  );
};

export default RecordAnsSection;
