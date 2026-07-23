import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    updateProfile,
    signOut
} from 'firebase/auth';



const googleProvider=new GoogleAuthProvider();


const AuthProvider = ({children}) => {


    const [user,setUser]=useState(null);
    // const [seller,setSeller]=useState(null);
    const [loading,setLoading]=useState(true);


    const createUser=(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
   
    
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const updateUserProfile=profileInfo=>{
        return updateProfile(auth.currentUser,profileInfo);
    }


    const logOut=()=>{
        setLoading(true);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        return signOut(auth);
    }

         useEffect(()=>{
            const unSubscribe=onAuthStateChanged(auth,currentUser=>{
                setUser(currentUser);
                console.log('user in the auth state change',currentUser)
                setLoading(false);
            })
            return () => {
                unSubscribe();
            }
         },[])

const authInfo={
    user,
    // seller,
    loading,
   createUser,
   signIn,
   signInWithGoogle,
   updateUserProfile,
   logOut
}



    
    




    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
