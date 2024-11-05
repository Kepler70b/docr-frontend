
"use client";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';


const Navbar = ({name}) => {
    const { logout,isAuthenticated } = useAuth();
    const router=useRouter()

    const handleLogout=()=>{
        logout();
        router.push('/');
    }

  return (
    <>
    <nav className="bg-transparent border-0 border-transparent fixed w-full z-20 top-0 start-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DOCR</span>
  </a>
  
  {isAuthenticated &&
  <div className="items-center space-x-6 justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <p className="px-4">{name}</p>
    {"| "}
  <button id="logout_btn" className="h-full w-full bg-transparent border-1 border-white rounded text-center text-zinc-500 focus:ring-0 sm:text-sm" onClick={handleLogout}>
    Logout
    </button>
  </div>}
  </div>
</nav>
</>
  );
};

export default Navbar;

{/* <nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                </li>
            </ul>
        </div>
    </div>
</nav> */}
