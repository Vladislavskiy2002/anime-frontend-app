import { createContext, useContext, useState } from "react";
import {executeToken,apiClient  } from '../AnimeApiService'

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    const [number,setNumber] = useState(null)
    const [token,setToken] = useState(null)
    const [isAutenticated, setAutenticated] = useState(false)
    const [username, setUsername] = useState(null)

    const valueToBeShared = {number, isAutenticated, login,logout, username,token}

    setInterval(() => setNumber(number+1),10000);

    return(
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    )

     async function login(username, password){
        try{
            console.log('us:' + username)
            console.log('pas: ' + password)
        const response = await executeToken(username,password)
        if(response.status == 200){
            const jwtToken = 'Bearer ' + response.data.token
            setAutenticated(true)
            setUsername(username)
            setToken(jwtToken)
            apiClient.interceptors.request.use(
                (config)=>{
                    config.headers.Autorization = jwtToken
                    return config
                }
            )
            return true
        } }
        catch(error){
            console.log('LOGOUT')
            logout()
            return false
        }
    }
    function logout(){
        setAutenticated(false)
    }
}
