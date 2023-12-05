"use client"
import React,{useState,useEffect} from 'react'
import Courses from '../(components)/Courses'
import Coursedetails from '../(components)/Coursedetails'
import Blog from '../(components)/Blog'
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

const page: React.FC = () => {
  const [newCourses, setnewCourses] = useState([]);
  const [topics,settopics] = useState([]);
  const [uid,setuid] = useState<String>('');
  const [cid,setcid] = useState<String>('');
  const [topicindex,setTopicindex] = useState<Number>(0);
  const [topicname,setTopicname] = useState<String>('');
  const [subtopicname,setsubTopicname] = useState<String>('');
  const [bgcolor,setbgcolor] = useState(['bg-cyan-600','bg-red-600','bg-amber-400','bg-lime-600','bg-orange-600','bg-green-600']);
    //const [course_id, setCourseid] = useState<string>('');
    //const [user_id, setUserid] = useState<string>('');

   useEffect(()=>{
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
        console.log("userid call",user_id);
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
        setTopicname(responset.topic[0].line)
    }

  return (
    <>
    <div className='grid grid-cols-2 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-9 2xl:grid-cols-9 3xl:grid-cols-9 gap-2 w-full h-[530px] flex'>
        <div className='col-span-2'>
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
        <div className='col-span-5' ><Blog uid={uid} cid={cid} topicindex={topicindex} topicname={topicname} subtopicname={subtopicname} /></div>
        <div className='col-span-2'>
            <Coursedetails topicnew={topics}
                onTopicSelected={(selectedTopic) => setTopicindex(selectedTopic)}
                onTopicnameSelected={(selectednameTopic) => setTopicname(selectednameTopic)}
                subtopicSelected={(selectedsubTopic) => setsubTopicname(selectedsubTopic)}
                    uid={uid} cid={cid}/>
        </div>
    </div>
    </>
  )
}

export default page;
