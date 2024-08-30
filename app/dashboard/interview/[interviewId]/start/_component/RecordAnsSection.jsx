"use cl"
import { Button } from "@/components/ui/button";
import { Image, Webcam } from "lucide-react";
import React from "react";
import useSpeechToText from 'react-hook-speech-to-text';

const RecordAnsSection = () => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });


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
      <Button variant="outline" className="my-10">
        Record Answer
      </Button>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
};

export default RecordAnsSection;
