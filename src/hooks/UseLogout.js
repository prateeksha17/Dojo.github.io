import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/Config";
import { UseAuthContext } from "./UseAuthContext";


export const UseLogout =() =>{
    const [isCancelled,setIsCancelled] = useState(false)

    const [error,setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = UseAuthContext()

    const logout = async () =>{
        setError(null)
        setIsPending(true)
    

    try{
        //update online status
        const { uid } = user
        await projectFirestore.collection('users').doc(uid).update({online: false})
        console.log('the online status was changed')
        await projectAuth.signOut()
       
        //dispatch login action
        dispatch({type:'LOGOUT' })

        //update state
        if(!isCancelled){
            setIsPending(false)
            setError(null)
        }
       
    }
    catch (err){
        if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }

    }
    }

    useEffect(()=>{
        return()=> setIsCancelled(true)
    },[])
return { error, isPending, logout}
}
