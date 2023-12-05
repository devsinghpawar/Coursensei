"use client"
import React,{useState,useEffect} from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Message {
    sender: string;
    text: string;
  }

export default function page() {
    const [pastarray,setPastarray] = useState<Message[]>([]);
    const [userchat,setUserchat] = useState<string>('');
    useEffect(()=>{
        setPastarray(pastarray);
    },[pastarray])
    async function handlesend(){
        //const accesst = localStorage.getItem('access_tokenn');
        const resobject: Message = {
            sender: "You:",
            text: userchat
        }

        let newarray = pastarray;
        newarray.push(resobject);
        setPastarray(newarray);

          const headers = new Headers({
            'Content-Type': 'application/json', // Specify that you're sending JSON data
          });
          
          const requestBody = {
            pastarraypacket: pastarray,
            usertext: userchat,
          };

            const getresp = await fetch("http://localhost:5000/chatapp",{
                method: 'POST', // Use POST method instead of GET
                headers: headers,
                body: JSON.stringify(requestBody), // Convert the request body to a JSON string
              }).then((response)=>{
                console.log(response)
                return response.json();
            }).then((data)=>{
                console.log(data);
                return data;
            })
        setPastarray(getresp.newpastarray);
    }
  return (
    <>
    <div className="flex flex-col w-full " style={{ height: 'calc(100vh - 100px)' }}>
        <div className='flex-1 w-full'>
            {pastarray?
            pastarray.map(pastchat => (
                <div className=''>
                    {pastchat.sender === "You:"?
                    <div className='grid grid-cols-1 w-full right-0 '>
                        <div className='col-span-1 text-green-400'>{pastchat.sender}</div>
                        <div className='col-span-1'>{pastchat.text}</div>
                    </div>
                    :
                    <div className='grid grid-cols-1 w-full'>
                        <div className='col-span-1 text-cyan-400'>{pastchat.sender}</div>
                        <div className='col-span-1'>{pastchat.text}</div>
                    </div>
                }
                </div>
            ))
            :
            <div className='justify-centre'>Ask AI your question</div>
            }
        </div>
        <div className=" grid bottom-0 grid-cols-10 gap-2 w-full">
            <Textarea placeholder="Type your message here." className='col-span-9'
            value={userchat}
            onChange={(e) => setUserchat(e.target.value)}/>
            <Button className="col-span-1 mt-auto mb-auto" onClick={handlesend}>Send</Button>
        </div>
    </div>
    </>
  )
}
