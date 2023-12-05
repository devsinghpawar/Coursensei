"use client"
import React,{useState} from "react";
import Image from 'next/image'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEdgeStore } from '../lib/edgestore';
import { SingleImageDropzone } from './(components)/SingleImageDropzone';
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import Courses from "./(components)/Courses";
import Homepage from "./(components)/Homepage";
import Files from "./(components)/Files";

export default function Home() {
  const [file, setFile] = React.useState<File>();
  const [imgurlnew,setimgurl] = React.useState<String>('');
  const [namet, setName] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [uploaded, setUploaded] = useState<string>('false');
  const [uploading, setUploading] = useState<string>('false');
  const [progressnew, setProgress] = useState<number>();
  const [thumbnailurlnew,setThumbnailurl] = React.useState<String>('');
  const { edgestore } = useEdgeStore();

  async function makecourse(){
    const accesst = localStorage.getItem('access_tokenn');
    const headers = new Headers();
        headers.append("name", String(namet));
        headers.append("topics", String(topics));
        headers.append("imgurl", String(imgurlnew));
        headers.append("accesst", String(accesst));

        await fetch("http://localhost:5000/makecourse",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        })
  }
  return (
    <div className="w-full">
      <div className='mt-4 ml-4'>

        <div className="flex w-full">
        <p className="text-3xl font-bold text-slate-900 leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Home</p>
        <Dialog>
            <DialogTrigger asChild>
            <Button className="ml-auto mr-4">Add course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                  Please add index page in image section if there are more than 1 select pdf from uploaded files. Not uploaded? go to files first!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="namet"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue="Course name"
                    className="col-span-4"
                  />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Topic
                  </Label>
                  <Textarea 
                  placeholder="To add main topic use '-' and under that subtopics can be added using '/' symbol."
                  className="col-span-4"
                  id="topics"
                  onChange={(e) => setTopics(e.target.value)} />
                </div>
                <div className="items-center grid grid-cols-5 gap-4 flex justify-center">
                <Button
                  onClick={async () => {
                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        onProgressChange: (progress) => {
                          // you can use this to show a progress bar
                          setUploading("true")
                          setProgress(progress);
                          console.log(progress);
                          if(progress===100){
                            setUploaded("true")
                          }
                        },
                      });
                      // you can run some server action or api here
                      // to add the necessary data to your database
                      console.log(res);
                      setimgurl(res.url)
                      //setThumbnailurl(res.thumbnailUrl)
                    }
                  }}
                  className=""
                >
                  Upload
                </Button>
                <div className="col-span-4">
                  <SingleImageDropzone
                    width={300}
                    height={175}
                    value={file}
                    onChange={(file) => {
                      setFile(file);
                    }}
                  />
                </div>
                </div>

                <div className="items-center grid grid-cols-5">
                <Progress value={progressnew} className="col-span-5" />
                </div>


              </div>
              <DialogFooter>
              {uploaded==="true"?
              <Button type="submit" onClick={makecourse}>Submit</Button>
              :
              <Button type="submit" onClick={makecourse} disabled>
                {uploading==="true"?
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />:<></>}
                Submit
              </Button>
              }
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </div>


      <Tabs defaultValue="courses" className="w-full mt-4">
        <TabsList>
        <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="courses"><Homepage/></TabsContent>
        <TabsContent value="files"><Files/></TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
