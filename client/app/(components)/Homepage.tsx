"use client"
import React from 'react'
import Courses from './Courses'
import Coursedetails from './Coursedetails'
import Logs from './Logs'
import {useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Homepage() {
  const [newCourses, setnewCourses] = useState([]);
  const [topics,settopics] = useState([]);
  const [uid,setuid] = useState<String>('')
  const [cid,setcid] = useState<String>('')
    //const [course_id, setCourseid] = useState<string>('');
    //const [user_id, setUserid] = useState<string>('');
    const [bgcolor,setbgcolor] = useState(['bg-cyan-600','bg-red-600','bg-amber-400','bg-lime-600','bg-orange-600','bg-green-600']);
    React.useEffect(()=>{
        async function getcourse(){
            const accesst = localStorage.getItem('access_tokenn');
            const headers = new Headers();
                headers.append("token", String(accesst));

            const responset = await fetch("http://localhost:5000/getcourse",{
            method:"GET",
            headers: headers,
            }).then((response)=>{
                console.log(response)
                return response.json();
            }).then((data)=>{
                console.log(data);
                return data;
            })
            setnewCourses(responset);
        }
        getcourse();
    },[])

    async function getcourseddetails(user_id:any,course_id:any){
      setuid(user_id);
      setcid(course_id);
        const headers = new Headers();
                headers.append("user_id", String(user_id));
                headers.append("course_id", String(course_id));
        const responset = await fetch("http://localhost:5000/getcourseblogs",{
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
        settopics(responset.topic)

    }
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-2 w-full flex'>
        <div className='col-span-1'>
          {newCourses.map((acourse,index) => (
              <div className={`w-full ${bgcolor[index]} rounded-xl mt-2`}>
                  <div className="w-[calc(100%-5px)] ml-[5px]">
                      <Card className="w-full p-2">
                          <div className="flex items-center space-x-4">
                              <Badge variant="secondary" className="">Ongoing</Badge>
                          </div>
                      <CardTitle className="mt-2 text-xl" onClick={() => getcourseddetails(`${acourse.user_id}`,`${acourse.courseid}`)}>{acourse.course_name}</CardTitle>
                      <CardDescription>Some random description about the course that is here for no reason</CardDescription>
                      <Button variant="outline" className="flex items-center justify-between w-full mt-2">
                          <span>Last leftoff article</span>
                          <ChevronRight className="h-5 w-5" />
                      </Button>
                      </Card>
                  </div>
              </div>
          ))}
        </div>
        <div className='col-span-1'><Coursedetails uid={uid} cid={cid} topicnew={topics}/></div>
        <div className='col-span-1'><Logs/></div>
    </div>
    </>
  )
}
