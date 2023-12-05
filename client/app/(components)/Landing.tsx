import React,{useState} from 'react'
import Image from 'next/image'
import dashboardpic from "./images/dashboardpic.png"
import Login from './Login';
export default function Landing() {
//const [uselogin,setLogin] = useState("landing");
    const login = () => {
        //setLogin("login");
        localStorage.setItem("login","allow");
    }
  return (
    <>
    
    <div className="background-blur-sm">
        <div>
            <section className="flex flex-col items-center gap-2 px-4 pt-8 md:pt-12 pb-8">
            <div className="relative group z-10">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt bg-black"></div>
                <a className="relative inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium" href="/docs/changelog">🎉 <div data-orientation="vertical" role="none" className="shrink-0 bg-border w-[1px] mx-2 h-4"></div> <span className="sm:hidden text-black">Make Payment, use AI all in one click</span><span className="hidden sm:inline text-black">Chat with AI now in-website itself</span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="black" fill-rule="evenodd" clip-rule="evenodd">
                        </path>
                        </svg>
                        </a>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Coursensei - Your AI Course builder and assistant</p><span className="max-w-[750px] text-lg text-center text-muted-foreground sm:text-xl text-white" data-br=":R1ir9hja:" data-brr="1">Just upload the image of your syllabus and let the AI do the rest, get customized course ready by one click!</span>
                        <div className="flex flex-col w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
                        <a target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="/login" onClick={login}>
            <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4"><path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z">
                </path></svg>Login/Signup</a></div></section>
        </div>
        <div className='flex flex-col items-center sm:pd-4'>
            <Image src={dashboardpic}  className="rounded-3xl" alt="dashbord" />
        </div>
        <div className='mt-8'>
            <div className='text-3xl font-bold text-slate-900 leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] ml-[50px] mr-auto'>Features</div>
            <div className='grid grid-cols-3 mt-4 gap-5 mb-10 p-4' >
                <div className='col-span-1 border rounded-2xl text-3xl p-2'>Course builder</div>
                <div className='col-span-1 border rounded-2xl text-3xl p-2'>AI Chat</div>
                <div className='col-span-1 border rounded-2xl text-3xl p-2'>File vault</div>
            </div>
        </div>
    </div>
    </>
  )
}