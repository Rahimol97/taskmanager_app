import { Link,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import api from '../api'

function Navbar() {     
     const [open, setOpen] = useState(false);
    const navigate = useNavigate();

const [username, setUsername] = useState(null);
useEffect(() => {
  checkUser();
   window.addEventListener("auth-change", checkUser);

  return () => {
    window.removeEventListener("auth-change", checkUser);
  };
},[])
const checkUser = async () => {
  try {
    const res = await api.get(
      "/users/me",
      { withCredentials: true }
    );
    setUsername(res.data.username);
  } catch {
    setUsername(null);
  }
};
const handleLogout = async () => {
  console.log("logout clicked");
  try {
    await api.post("/users/logout");
        navigate("/login");
        setUsername(null);
        console.log(username,"nhbdhfd");
        
         window.dispatchEvent(new Event("auth-change"));
    

  } catch {
    alert("Logout failed");
  }
};

  return (
  <nav className="bg-(--purple-dark) text-(--yellow) px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-wide">
          Task Manager
        </h1>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-10">
                 <Link
            to="/"><h1 className="text-xl font-semibold cursor-pointer">
          Home
        </h1></Link> 


        </div>

        {/* Right Auth Links */}
       {username  ? (
    <div className="flex items-center gap-3">
  <span className="font-semibold mr-4">
    Welcome,{username}
  </span>
 <button
    onClick={handleLogout}
      className="bg-(--yellow) hover:bg-(--orange) cursor-pointer text-slate-900 px-3 py-1 rounded"
    >
      Logout
    </button>

</div>
       ):(
             
        <div className="hidden md:flex space-x-6">
          <Link
            to="/login"
            className="hover:text-(--orange) transition"
          >
            Login
          </Link>
                    <Link
            to="/register"
            className="bg-(--yellow) px-4 py-1 rounded-full text-slate-900 font-medium hover:bg-(--orange) transition"
          >
            Signup
          </Link>
        </div>
     )}
           <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
       {open && (
        <div className="md:hidden px-6 py-4 space-y-4 text-center">
          <Link to="/" onClick={() => setOpen(false)} className="m-3">Home</Link>
    {!username && (
      <>
    <Link to="/login" onClick={() => setOpen(false)} className="m-3">Login</Link>
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="block m-3 bg-(--yellow) text-slate-900 rounded-full py-1 font-medium "
          >
            Signup
          </Link>
          </>
        )}
        </div>
      )}
    </nav>
  )
}

export default Navbar