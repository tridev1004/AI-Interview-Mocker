"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const Router=useRouter();

  return (
   <div>
    <h1>Home Page</h1>
    <Button onClick={()=>Router.push('/dashboard')}>Start</Button>
   </div>
  );
  
}
