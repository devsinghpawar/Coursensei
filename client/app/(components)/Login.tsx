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
import { useRouter } from 'next/router';

const CLIENT_ID = '0oad1chls5zLFzw2H5d7';
const REDIRECT_URL = 'http://localhost:3000/';

export default class Login extends Component{
    oktalogin = async()=>{
        window.location.assign("https://dev-03681960.okta.com/oauth2/v1/authorize?client_id=" + CLIENT_ID + "&response_type=code&scope=openid&redirect_uri=" + REDIRECT_URL +"&state=randomstring");
    };

    async componentDidMount(){
        console.log("ran..");
        var user_id:any,main_name:any,email:any,locale:any;
        const querysearch = window.location.search;
        const urlParams = new URLSearchParams(querysearch);

        //normal client login
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if(codeParam && (localStorage.getItem("acces_tokenn")===null)){
            const getaccesstokan = async()=>{
            await fetch("http://localhost:4000/accessToken?code="+urlParams.get("code"),{
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
                await fetch("http://localhost:4000/validateuser",{
                method:"GET",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("access_tokenn")
                }
                }).then((response)=>{
                    console.log(response)
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                    user_id = data.sub;
                    main_name = data.name;
                    email = data.email;
                    locale = data.locale;
                    localStorage.setItem("user_id",user_id)
                    console.log(main_name);
                    console.log(email);
                })
                //if(user_id !== null)
                saveuser(user_id,main_name,email,locale);
            }

            const  saveuser = async function(user_id:any,main_name:any,email:any,locale:any){
                const token = localStorage.getItem("access_tokenn");
                const headers = new Headers();
                    headers.append("token", token || "");
                    headers.append("user_id", String(user_id));
                    headers.append("main_name", String(main_name));
                    headers.append("email", String(email));
                    headers.append("locale", String(locale));
                await fetch("http://localhost:4000/saveuser",{
                method:"GET",
                headers: headers,
                }).then((response)=>{
                    console.log(response)
                    return response.json();
                }).then((data)=>{
                    console.log(data);
                })
            }
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
          <Button variant="outline" onClick={this.oktalogin}>
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
