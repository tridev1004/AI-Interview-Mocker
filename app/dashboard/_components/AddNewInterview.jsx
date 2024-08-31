"use client";
import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const[jsonRepsonse,setJsonResponse]=useState([]);
  const router=useRouter();
  const {user}=useUser();
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesc, jobExperience, jobPosition);

    const InputPrompt =
      "Job position : " +
      jobPosition +
      ", Job Description :" +
      jobDesc +
      ", Years of Experience :" +
      jobExperience +
      " Depends upon Job position,Job Description & years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview Question along with Answer in JSON Format, Give us Question and answer field on JSON And don't give explanation i need just the json to parse and don't give the question's q in capital it is problomatic in letter casing now my code is written of json in small q not big Q ";
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = await (result.response
      .text())
      .replace("```json", "")
      .replace("```", "").replace("**",""); // Ensure to await here
      console.log("Raw JSON String:", MockJsonResp);
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    
    const response=await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDescription: jobDesc,
        jobExperience: jobExperience,
        createdBy:user?.primaryEmailAddress.emailAddress,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),


    }).returning({mockId:MockInterview.mockId})
    console.log("Inserted Id",response);
    
     
    
     if(response){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+response[0]?.mockId);
     }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview{" "}
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7  my-3">
                    <label>Job Role/Job Positon</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className=" my-3">
                    <label>Job Description/ Tech stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React,SpringBoot..."
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className=" my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex.5"
                      type="number"
                      required
                      max="25"
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
