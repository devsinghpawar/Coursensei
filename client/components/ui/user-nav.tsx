"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { useEffect,useState } from "react"
  import {useRouter} from 'next/navigation'
  export function UserNav() {
    const router = useRouter();
    const [newuserdetails,setuserdetails] = useState<String[]>([])
    useEffect(()=>{
      async function getdetails(){
        const token = localStorage.getItem("access_tokenn")
        const headers = new Headers();
              headers.append("token", token || "");
        await fetch("http://localhost:5000/getuser",{
                method:"GET",
                headers: headers
            }).then((response)=>{
                //console.log(response)
                return response.json();
            }).then((data)=>{
                console.log(data);
                setuserdetails(data)
                //window.location.assign('http://localhost:3000/');
            })
      }
      getdetails();
    },[])

    async function deletetoken(){
      localStorage.removeItem('access_tokenn');
      router.push('/login')
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={newuserdetails[0]?.github_avatar_url} alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{newuserdetails[0]?.github_name}</p>
              <p className="text-xs leading-none text-muted-foreground">
              @{newuserdetails[0]?.github_username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deletetoken}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }