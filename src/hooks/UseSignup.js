import { useState , useEffect} from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/Config";
import { UseAuthContext } from "./UseAuthContext";


export const UseSignup =() =>{
    const [isCancelled,setIsCancelled] = useState(false)
    const [error,setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = UseAuthContext()

    const signup = async (email, password, displayName, thumbnail) =>{
        setError(null)
        setIsPending(true)
    

    try{
        //signup user
        const res= await projectAuth.createUserWithEmailAndPassword(email,password)
        

        if(!res){
            throw new Error('could not complete signup')
        }

          //upload user thumbnail
          const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
          const img = await projectStorage.ref(uploadPath).put(thumbnail)
          await projectStorage.ref(uploadPath).put(thumbnail)
          const imgUrl = await img.ref.getDownloadURL()

        //add diaplay name to the user.
        await res.user.updateProfile({ displayName, photoURL: imgUrl})

       //create a user document
       await projectFirestore.collection('users').doc(res.user.uid).set({
        online:true,
        displayName,
        photoURL: imgUrl
       })

        //dispatch login action
        dispatch({type:'LOGIN', payload: res.user})

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
        return ()=> setIsCancelled(true)
    },[])
return { error, isPending, signup}
}
