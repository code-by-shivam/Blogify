import { jwtDecode } from 'jwt-decode';
import { decode } from 'punycode';
import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import Spinner from './Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const location = useLocation()

    useEffect(function(){
        authorize().catch(() => setIsAuthorized(false))
    },[])


    async function refreshToken(){
        const refresh = localStorage.getItem("refresh");
        try{
            const response = await api.post("token_refresh/",{refresh});
            if(response.status === 200){
                localStorage.setItem("access", response.data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        }
        catch(err){
            setIsAuthorized(false);
            console.log(err);
        }
    }
    async function authorize(){
        const token = localStorage.getItem("access");
        if(!token){
            setIsAuthorized(false);
            return;
        }
        const decodeToken = jwtDecode(token)
        const expiry_date = decodeToken.exp 
        const current_time = Date.now()/1000;
        if(current_time > expiry_date){
            await refreshToken()
        }
        else {
            setIsAuthorized(true);
        }

    }

    if(isAuthorized === null){
       return <Spinner/>
    }
  return (
    <>
    {isAuthorized ? children : <Navigate to="/signin" state={{from:location}} replace />}
    </>
  )
}

export default ProtectedRoute