"use client"
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import dashboardpic from "./images/dashboardpic.png"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Coursedetails({ topicnew, onTopicSelected , onTopicnameSelected,subtopicSelected,uid,cid}: { topicnew?: any[] ,onTopicSelected: (selectedTopic: any) => void ,onTopicnameSelected: (selectednameTopic: any) => void ,subtopicSelected: (selectedsubTopic: any) => void,uid:any,cid:any,}) {

    const [newsubtopics,setnewsubtopics ] = useState([]);
    const handleTopicClick = (selectedTopic: any,selectednameTopic: any) => {
        console.log(selectedTopic);
        onTopicSelected(selectedTopic);
        onTopicnameSelected(selectednameTopic);
    };

    useEffect(()=>{
        async function getsubtopics(){
            const headers = new Headers();
                  headers.append("user_id", String(uid));
                  headers.append("course_id", String(cid));
            const responset = await fetch("http://localhost:5000/getsubtopics",{
                method:"GET",
                headers: headers,
                }).then((response)=>{
                    console.log(response)
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    return data;
            })
        console.log(responset)
        setnewsubtopics(responset);
        }
        getsubtopics();
    },[topicnew])

    async function displaySubtopic(subtopicfetched: any){
        subtopicSelected(subtopicfetched);
    }
    return (
    <>
    <div className='w-full bg-gray-200 rounded-xl border-2 border-slate-200'>
        <Image src={dashboardpic}  className="rounded-xl w-full" alt="dashbord" />
        <div className='w-full p-2'>
            <Accordion type="single" collapsible className="w-full mx-2">
                {topicnew ? (
                    topicnew.map((topic: any,index: number) => (
                        <AccordionItem key={`item-${index+1}`} value={`item-${index+1}`}>
                            <AccordionTrigger>
                                <button onClick={() => handleTopicClick(index,topic.line)}>{topic.line}</button>
                            </AccordionTrigger>
                            {newsubtopics && newsubtopics[index] ?
                                newsubtopics[index].map((newsubtopic:any,subtopicindex: any )=>(
                                    <AccordionContent className='bg-gray-500 p-2 rounded-lg text-white my-1' onClick={() => displaySubtopic(newsubtopic)}>
                                        {newsubtopic}
                                    </AccordionContent>
                                ))
                                :
                                <div>Waiting...</div>
                            }
                        </AccordionItem>
                    ))
                ) : (
                    <p>No topics available</p>
                )}
            </Accordion>
        </div>
    </div>
    </>
  )
}
