"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const Router=useRouter();
  const routing=()=>{
    Router.push("/dashboard")
  }
  return (
   <div>
    <h1>Home Page</h1>
    <Button onClick={routing}>Start</Button>
   </div>
  );
  
}
