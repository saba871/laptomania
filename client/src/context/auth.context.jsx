import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ჩემი backend-ის მისასმართი
const API_URL = import.meta.env.VITE_API_URL + '/api';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  // auto login ფუნქცია
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/auto-login`, {
          method: "POST",
          credentials: "include",
        });
        const result = await res.json();
        setUser(result.user);

        // თუ already logged in და Login page-ზე ვართ
        if (result.user && window.location.pathname === '/login') {
          navigate('/panel');
        }

      } catch (err) {
        console.log(err);
        setUser(null);
      }
    }

    autoLogin();
  }, [])


  // sign up ფუნქცია
  const signUp = async (formObj) => {
    const toastId = toast.loading('Signing up...');

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj),
      })
      const result = await res.json();

      alert(result.message);
      navigate('/login');

      toast.update(toastId, {
        render: 'Signed up Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(error){
      toast.update(toastId, {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }

  // log in ფუნქცია
  const logIn = async (formObj) => {
    const toastId = toast.loading('Logging in...');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formObj),
      })
      const result = await res.json();

      setUser(result.user);
      navigate('/panel');

      toast.update(toastId, {
        render: 'Logged in Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(error) {
      toast.update(toastId, {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }


  // log out ფუნქცია
  const logOut = async () => {
    const toasId = toast.loading('Logging out...');
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      })

      setUser(null);
      navigate('/');

      toast.update(toasId, {
        render: 'Logged out Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch(error){
      toast.update(toasId, {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
    }
  }

  return(
    <AuthContext.Provider value={{user, signUp, logIn, logOut}}>
      { children }
    </AuthContext.Provider>
  )
}
