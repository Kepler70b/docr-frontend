"use client"
import { useAuth } from './context/AuthContext';
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import Main from "./components/Main";
import Login from './auth/login/page';
import Signup from './auth/signup/page';
import Navbar from './components/Navbar';


export default function Home() {
  const { isAuthenticated, username } = useAuth();
  return (
    <div className={styles.page}>
      <Navbar name={username}/>
      <main className={styles.main}>
        
       {isAuthenticated ? (
        <>
          <Main/>
        </>
      ) : (
        
        <Login/>
      )}

        
      </main>
      
    </div>
  );
}
