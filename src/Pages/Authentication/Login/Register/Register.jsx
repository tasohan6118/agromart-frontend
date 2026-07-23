import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import userAuth from '../../../../Hooks/userAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../../Axios/useAxios';
import { useLanguage } from '../../../../Context/LanguageContext/LanguageContext';

const Register = () => {
const {register,handleSubmit,formState:{errors}}=useForm();
const {createUser,updateUserProfile}=userAuth();
const [profilePic,setProfilePic]=useState('');
const axiosInstance=useAxios();
const { language } = useLanguage();

const text = language === 'bn'
  ? {
      title: 'একটি অ্যাকাউন্ট তৈরি করুন!',
      name: 'আপনার নাম',
      namePlaceholder: 'আপনার নাম লিখুন',
      image: 'আপনার ছবি',
      email: 'ইমেইল',
      emailPlaceholder: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'পাসওয়ার্ড',
      forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
      register: 'রেজিস্টার',
      haveAccount: 'আগেই অ্যাকাউন্ট আছে?',
      login: 'লগইন',
      nameRequired: 'নাম প্রয়োজন',
      emailRequired: 'ইমেইল প্রয়োজন',
      passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
      passwordLength: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
    }
  : {
      title: 'Create An Account!',
      name: 'Your Name',
      namePlaceholder: 'your Name',
      image: 'Your Image',
      email: 'Email',
      emailPlaceholder: 'Email',
      password: 'Password',
      passwordPlaceholder: 'Password',
      forgot: 'Forgot password?',
      register: 'Register',
      haveAccount: 'Already have an account?',
      login: 'Login',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be 6 characters or longer',
    };

const onSubmit=data=>{
    console.log(data);
    createUser(data.email,data.password)
    .then(async(result)=>{
      console.log(result.user)

      const userInfo={
      email:data.email,
      role:'user',
      created_at:new Date().toISOString(),
      last_log_in:new Date().toISOString()
      }

      const userRes=await axiosInstance.post('/users',userInfo)
      console.log(userRes.data);

    const userProfile={
      displayName:data.name,
      photoURL:profilePic
    }
    updateUserProfile(userProfile)
    .then(()=>{
      console.log('profile name pic updated')
    })
    .catch(error=>{
      console.log(error)
    })
    })
    .catch(error=>{
      console.error(error);
    })
}

const handleImageUpload = async(e)=>{
  const image=e.target.files[0]
  console.log(image);
  const formData=new FormData();
  formData.append('image',image);
  const imageUploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

const res=await axios.post(imageUploadUrl,formData)
setProfilePic(res.data.data.url)
}

    return (
    <div className="card bg-base-300 w-full h-160 max-w-sm shrink-0 shadow-2xl mb-8">
      <div className="card-body">
        <h1 className="text-5xl font-bold">{text.title}</h1>
       <form onSubmit={handleSubmit(onSubmit)}>
         <fieldset className="fieldset">
                <label className="label">{text.name}</label>
              <input type="text" {...register('name',{required:true})} className="input" placeholder={text.namePlaceholder} />

        {
          errors.name?.type==='required' && <p className='text-red-500'>{text.nameRequired} </p>
        }

                <label className="label">{text.image}</label>
              <input type="file" onChange={handleImageUpload} className="input" placeholder={language === 'bn' ? 'আপনার প্রোফাইল ছবি' : 'your Profile Picture'} />

        {
          errors.name?.type==='required' && <p className='text-red-500'>{text.nameRequired} </p>
        }

          <label className="label">{text.email}</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder={text.emailPlaceholder} />

        {
          errors.email?.type==='required' && <p className='text-red-500'>{text.emailRequired} </p>
        }

          <label className="label">{text.password}</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="input" placeholder={text.passwordPlaceholder} />

              {
                errors.password?.type==='required' && <p className='text-red-500'>{text.passwordRequired}</p>
              }
              {
                errors.password?.type==='minLength' && <p className='text-red-500'>{text.passwordLength}</p>
              }

          <div><a className="link link-hover">{text.forgot}</a></div>
          <button className="btn btn-neutral mt-4">{text.register}</button>
        </fieldset>
        <p><small>{text.haveAccount}<Link className="btn btn-link" to="/login">{text.login}</Link></small></p>
       </form>
       <SocialLogin></SocialLogin>
      </div>
    </div>
    );
};

export default Register;
