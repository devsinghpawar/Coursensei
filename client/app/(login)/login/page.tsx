"use client"
import React, { Component, useEffect, useState } from 'react'
import { Icons } from "@/components/ui/icons"
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
import {useRouter} from 'next/navigation'

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const REDIRECT_URL = 'http://localhost:3000/login/';

export default class page extends Component{
  
    githublogin = async()=>{
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=repo&redirect_uri=" + REDIRECT_URL +"&state=randomstring");
    };

    async componentDidMount(){
        var redrct:any;
        console.log("ran..");
        var github_username:any,
        github_id :any,
        github_avatar_url :any,
        github_name :any,
        github_location :any,
        github_email :any;
        const querysearch = window.location.search;
        const urlParams = new URLSearchParams(querysearch);

        //normal client login
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if(codeParam && (localStorage.getItem("acces_tokenn")===null)){
            const getaccesstokan = async()=>{
            await fetch("http://localhost:5000/accessToken?code="+urlParams.get("code"),{
                method:"GET"
            }).then((response)=>{
                //console.log(response)
                return response.json();
            }).then((data)=>{
                console.log(data);
                if(data.access_token){
                localStorage.setItem("access_tokenn",data.access_token);
                }
                //window.location.assign('http://localhost:3000/');
                validateuser();
            })
            };
            getaccesstokan();
            const  validateuser = async function(){
              await fetch("http://localhost:5000/validateuser",{
                method:"GET",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("access_tokenn")
                }
                }).then((response)=>{
                    console.log(response)
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    github_username = data.login;
                    github_id = data.id;
                    github_avatar_url = data.avatar_url;
                    github_name = data.name;
                    github_location = data.location;
                    github_email = data.email;
                    localStorage.setItem("github_id",github_id)
                    console.log(github_username);
                    console.log(github_id);
                })
                //if(user_id !== null)
                saveuser(github_username,github_id,github_avatar_url,github_name,github_location,github_email);
            }

            const  saveuser = async function(
              github_username:any,
              github_id :any,
              github_avatar_url :any,
              github_name :any,
              github_location :any,
              github_email :any){
                const token = localStorage.getItem("access_tokenn");
                const headers = new Headers();
                    headers.append("token", token || "");
                    headers.append("github_username", String(github_username));
                    headers.append("github_id", String(github_id));
                    headers.append("github_avatar_url", String(github_avatar_url));
                    headers.append("github_name", String(github_name));
                    headers.append("github_location", String(github_location));
                    headers.append("github_email", String(github_email));
                await fetch("http://localhost:5000/saveuser",{
                method:"GET",
                headers: headers,
                }).then((response)=>{
                    console.log(response)
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    redrct = "yes";
                })
            }
        }
        if(redrct==="yes"){
        window.location.assign('/')
        }
        }
render(){
  return (
    <>
    <div className='grid w-full mt-10'>
    <div className="w-[400px] justify-self-center">
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={this.githublogin}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
    </div>
    </div>
    </>
  )
}
}
