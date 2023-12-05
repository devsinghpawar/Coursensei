"use client"
import * as React from "react"
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

const Courses: React.FC<ChildComponentProps> = (props) => {
    const [newCourses, setnewCourses] = useState([]);
    //const [course_id, setCourseid] = useState<string>('');
    //const [user_id, setUserid] = useState<string>('');

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
        const headers = new Headers();
                headers.append("user_id", String(user_id));
                headers.append("course_id", String(course_id));
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
        props.handleDataFromChild(responset.topic)

    }
  return (
    <>
{newCourses.map(acourse => (
<div className="w-full bg-cyan-600 rounded-xl mt-2">
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
    </>
  )
}

export default Courses;