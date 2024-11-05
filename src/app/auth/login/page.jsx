"use client";
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { loginfunc ,signupfunc } from '@/utils/api';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting,setSubmit]=useState(false);
  const [errorText,setErrorText]=useState("")
  const [mode,setMode]=useState('LOGIN')
  const { login } = useAuth();
  const router = useRouter();

  const changeMode=()=>{
    setMode((prev)=>{
      if(prev==='LOGIN'){
        return 'REGISTER'
      }else{
        return 'LOGIN'
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true)
    try {
      if(mode=="LOGIN"){
        const res=await loginfunc(username,password);
        console.log(res)
        if(res.status==200){
          // let access_token =Cookie.set('access_token',res.data.token)
          let access_token=res.data.token
          login({access_token,username})
          router.push("/")
        }else if(res.status==500){
          setErrorText("Something went wrong")
          
        }else{
          setErrorText("Invalid Credentials")
        }
      }else{
        const res=await signupfunc(username,password);
        console.log(res)
        if(res.status==200){
          // let access_token =Cookie.set('access_token',res.data.token)
          setMode("LOGIN")
          router.push("/")
        }else if(res.status==500){
          setErrorText("Something went wrong")
          
        }else{
          setErrorText("Invalid Credentials")
        }
      }
      
    } catch (error) {
      console.log(error);
      if(error.status==500){
        setErrorText("Something went wrong")
        
      }else{
        setErrorText("Invalid Credentials")
      }
      
    }
    
    setSubmit(false)
    // login();
    // router.push('/'); 
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
      <div className="p-8">
      <h4 className="text-center p-3 text-black">{mode}</h4>
    <form 
    className="flex flex-col items-center justify-center "
    onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">Username</label>
        <input 
          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />

          {/* <input type="text" name="username" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"/> */}
        </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
        <input
          className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          {/* <input type="text" name="password" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"> */}
      </div>
      
      {/* <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow" disabled={isSubmitting}>
      {isSubmitting && <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>}
        Login
      </button> */}
      <button disabled={isSubmitting} className="w-full p-3 mt-4 bg-indigo-600 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
        {isSubmitting && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>}
        {isSubmitting && "Loading..."}
        {!isSubmitting && mode}
      </button>
      <div className="flex justify-between p-3 m-3 text-sm border-t border-gray-300 items-center">
                    <h5 className="text-black"> {mode=='LOGIN' ?"New here?" : "not new?"} </h5>
                    <button role="button" type="button" className="rounded-full block inline p-2 hover:bg-blue-100 dark:hover:bg-blue-80 hover:bg-blue-80 dark:text-sky-400/100 dark:hover:text-blue-700 dark:focus:ring-blue-800" onClick={changeMode} >
                      {mode=='LOGIN' ? "Create account":"Login to account"}
                      </button>
                </div>
      {errorText!="" && <div className="flex justify-between p-3 text-sm items-center dark:text-red-400">
                    <p >Error: {errorText}</p>
                </div>}
    </form>
    </div>
    </div>
  );
};

export default Login;
