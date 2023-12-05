"use client"
import React,{useEffect,useState, useRef } from 'react'
//import backgroundImage from './images/empty.png';
import backgroundImage from './images/emptysvg.svg';
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Blog({topicindex,uid,cid,topicname,subtopicname} :{topicindex?:any,uid?:any,cid:any,topicname: any,subtopicname?: any}) {
  const [blogdata,setblogdata] = useState<String>('');
  const [subtopicblogdata,setsubtopicblogdata] = useState<String>('');
  const isMounted = useRef(false);

  useEffect(()=>{
    //if (!isMounted.current) {
      //isMounted.current = true;
      //return;
    //}

    async function getsubindividualblogs(){
      if (!subtopicname) {
        // Skip the initial render
        return;
      }
      const headers = new Headers();
                  headers.append("user_id", String(uid));
                  headers.append("course_id", String(cid));
                  headers.append("subtopicname", String(subtopicname));
                  headers.append("topicname", String(topicname));
          const responset = await fetch("http://localhost:5000/getsubtopicblogs",{
              method:"GET",
              headers: headers,
              }).then((response)=>{
                  console.log(response)
                  return response.text();
              }).then((data)=>{
                  console.log(data);
                  return data;
          })
      console.log(responset)
      setsubtopicblogdata(responset)
    }
    getsubindividualblogs();
  },[subtopicname])


  useEffect(()=>{
    async function getindividualblogs(){
      const headers = new Headers();
                  headers.append("user_id", String(uid));
                  headers.append("course_id", String(cid));
                  headers.append("Topicindex", Number(topicindex).toString());
          const responset = await fetch("http://localhost:5000/getindividualblogs",{
              method:"GET",
              headers: headers,
              }).then((response)=>{
                  console.log(response)
                  return response.text();
              }).then((data)=>{
                  console.log(data);
                  return data;
          })
      console.log(responset)
      setblogdata(responset)
    }
    getindividualblogs();
  },[topicindex,uid,cid,topicname])
  return (
    <>
    {uid?(
      <div>
      {subtopicname?(
        <div className='w-full h-full bg-grey-200 p-2 rounded-xl relative'>
          <div>
          <p className="text-3xl">{subtopicname}</p>
          {subtopicblogdata?
            <div>{subtopicblogdata}</div>
            :
            <div className="justify-center text-3xl"> Blog not found</div>
          }
          </div>
          <Button variant="outline" className="mt-2 right-0 absolute">Next</Button>
        </div>
        )
        :
        (
        <div className='w-full h-full bg-grey-200 p-2 rounded-xl relative'>
          <div>
          <p className="text-3xl">{topicname}</p>
          <div>{blogdata}</div>
          </div>
          <Button variant="outline" className="mt-2 right-2 absolute">See blogs</Button>
        </div>
    )}
    </div>
    ) : (
    <div className='w-full h-screen p-2 rounded-xl'>
      <Image
        src={backgroundImage}
        alt="Your Alt Text" // Provide a suitable alt text for accessibility
        className="object-cover w-full h-full"
      />
    </div>
    )
    }
    </>
  )
}
