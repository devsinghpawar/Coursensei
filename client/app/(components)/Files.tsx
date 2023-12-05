"use client"
import React,{useState,useEffect} from "react";
import Image from 'next/image';
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
import { useEdgeStore } from '../../lib/edgestore';
import { SingleImageDropzone } from './SingleImageDropzone';
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

export default function Files() {
    const [file, setFile] = React.useState<File>();
  const [imgurlnew,setimgurl] = React.useState<String>('');
  const [namet, setName] = useState<string>('');
  const [topics, setTopics] = useState<string>('');
  const [uploaded, setUploaded] = useState<string>('false');
  const [uploading, setUploading] = useState<string>('false');
  const [progressnew, setProgress] = useState<number>();
  const [thumbnailurlnew,setThumbnailurl] = React.useState<String>('');
  const { edgestore } = useEdgeStore();
  const [fileuploadstatus,setreloadfiles] = React.useState<String>('');
  const [ allfiles,setallfiles ] = useState([]);

  const [filename,setFilename]=useState<String>('')
  const [filefileurl,setFilefileurl]=useState<String>('')
  const [filesavingtime,setFilesavingtime]=useState<String>('')
  const [filetextarray,setFiletext]=useState([])

  async function uploadfile(){
    const accesst = localStorage.getItem('access_tokenn');
    const headers = new Headers();
        headers.append("name", String(namet));
        headers.append("fileurl", String(imgurlnew));
        headers.append("accesst", String(accesst));

        const getresp = await fetch("http://localhost:5000/uploadfile",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.text();
        }).then((data)=>{
            console.log(data);
            return data;
        })
        setreloadfiles(getresp);
  }

  useEffect(()=>{
    async function fetchfiles(){
        const accesst = localStorage.getItem('access_tokenn');
        const headers = new Headers();
        headers.append("accesst", String(accesst));

        const getresp = await fetch("http://localhost:5000/getfiles",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        })
        setallfiles(getresp);
    }
    fetchfiles();
  },[fileuploadstatus])

  async function loadfile(fname:any,ffileurl:any,fsavingtime:any,ftext:any){
    setFilename(fname);
    setFilefileurl(ffileurl);
    setFilesavingtime(fsavingtime);
    setFiletext(ftext);
  }
  return (
    <>
    <div className="flex grid grid-cols-10">
        <div className='col-span-3 flex-1'>
          <Dialog>
            <DialogTrigger asChild>
            <Button className="ml-auto mr-4">Upload File</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload file</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="namet"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue="File_name"
                    className="col-span-4"
                  />
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
              <Button type="submit" onClick={uploadfile}>Submit</Button>
              :
              <Button type="submit" onClick={uploadfile} disabled>
                {uploading==="true"?
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />:<></>}
                Submit
              </Button>
              }
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1">
            {allfiles?
                allfiles.map(file=>(
                    <Button variant="outline" className="col-span-1 w-full mt-2"
                    onClick={() => loadfile(file.name, file.fileurl, file.savingtime, file.filetext)}>
                        {file.name}</Button>
                ))
                :
                <div> Empty rn photo coming</div>
            }
          </div>
        </div>
        <div className='col-span-7 flex-1 mt-5 border-slate-800 h-full rounded-xl p-4'>
          <div className="text-3xl">File details</div>
            <div className="grid grid-cols-2 mt-5">
                <div className="col-span-1">File Name: </div>
                <div className="col-span-1">{filename}</div>
            </div>
            <div className="grid grid-cols-2 mt-2">
                <div className="col-span-1">Url: </div>
                {filefileurl?
                <Button className="col-span-1 w-[150px]" onClick={() => window.location.href = filefileurl.toString()}>See File</Button>
                 :
                 <div></div>
                 }
                </div>
            <div className="grid grid-cols-2 mt-2">
                <div className="col-span-1">Upload time: </div>
                <div className="col-span-1">{filesavingtime}</div>
            </div>
            <div className="mt-2">
                <div>Text inside: </div>
                {filetextarray?
                filetextarray.map((lines:any,index:any)=>(
                    <div>
                        <div>{index}</div>
                        <div>{lines}</div>
                    </div>
                ))
                :
                <div>No Text extracted</div>
                }
            </div>
        </div>
    </div>
    </>
  )
}
