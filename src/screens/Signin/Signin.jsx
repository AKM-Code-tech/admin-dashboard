import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Signin() {

    const [loading , setLoading] = useState(true)
    let navigate = useNavigate()
 

    function sendDataToApi(values){
        setLoading(false)
         axios.post('https://project-model.onrender.com/api/v1/auth/signin',values)
         .then(({data})=>{
            console.log(data);
            if(data.message=='success'){

                localStorage.setItem('token',data.token)
                
                navigate('/')
            }
            
        }).catch()
        setLoading(true)
        
    }


    function validationSchema(){
        let schema = new Yup.object({
            email:Yup.string().email().min(2).required('email is required'),
            password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-])(?=.{8,})/ , 'enter a valid password').required('password is required')
        })
        return schema
    }

    let login = useFormik({
        initialValues:{ email:'',password:''},

        validationSchema ,
        
        onSubmit:(values)=>{
            // console.log(values);
            sendDataToApi(values)
        }
    })

  return (
    <div>
        <div className="w-75 m-auto my-4">
            <h2>Login</h2>
            <form onSubmit={login.handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange} type="email" name='email' id='email' className='form-control' />
                {login.errors.email && login.touched.email ? <div className="alert alert-danger my-2">{login.errors.email}</div>:''}

                <label className='my-1' htmlFor="password">Password</label>
                <input onBlur={login.handleBlur}  value={login.values.password} onChange={login.handleChange} type="password" name='password' id='password' className='form-control' />
                {login.errors.password && login.touched.password ? <div className="alert alert-danger my-2">{login.errors.password}</div>:''}


                <button disabled={!(login.dirty && login.isValid)} type='submit' className='btn btn-primary text-white my-2'>
{loading?'Signin':<i className='fa fa-spinner fa-spin '></i>}
                </button>
            </form>
        </div>
    </div>
  )
}
