import { useFormik } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
export const Register = () => {
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


const registerFormik = useFormik({
  initialValues:{
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    cPassword:''
  },
  onSubmit: async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("https://smart-choice-theta.vercel.app/api/v1/signup", values);
      console.log("Registration successful:", response.data);
      
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ email: "Email already exists or other error" });
    } finally {
      setSubmitting(false);
    }
  }
  
  ,
  validationSchema: yup.object({
    firstName: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters').max(15, 'First name must be at most 15 characters'),
    lastName: yup.string().required('Last name is required').min(3, 'Last name must be at least 3 characters').max(15, 'Last Name must be at most 15 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      "must be at least 8 characters and include an uppercase,a lowercase, a number, and a special character (#?!@$%^&*-)"
    ).required('Password is required'),
    cPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
  })
})

  return (
    <div className="flex justify-center  items-center min-h-screen  px-4 sm:px-6 lg:px-8 "> 
      <div className=" bg-white mt-1 sm:mt-0 p-6  sm:p-8 rounded-xl shadow-[#3333333a] shadow-2xl w-full max-w-md ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center -mt-2">Create an Account</h2>
        {/* have account already */}
        <p className="text-center text-gray-600 mt-2 ">
          Already have an Account? <Link to='/Login' className="text-[#4F7292] hover:text-[#91bfea] hover:transition-all duration-400 ease-in-out">Log in</Link>
        </p>
        <form onSubmit={registerFormik.handleSubmit} className="mt-6">
          {/* first name and last name inputs */}
          <div className=" flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
            <div className=" ">
              <input id="firstName" name="firstName" onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.firstName} type="text" placeholder="First name"className="w-full p-2 mt-2 sm:mt-0 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0 md:w"/>
              {registerFormik.touched.firstName && registerFormik.errors.firstName ? (
                <p className="text-red-500 text-xs mt-1">{registerFormik.errors.firstName}</p>
              ) : null}
            </div>
            <div className="">
              <input id="lastName" name="lastName" onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange}value={registerFormik.values.lastName} type="text" placeholder="Last name" className="w-full p-2 mt-2 sm:mt-0 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0"/>
              {registerFormik.touched.lastName && registerFormik.errors.lastName ? (
                <p className="text-red-500 text-xs mt-1">{registerFormik.errors.lastName}</p>
              ) : null}
            </div>
          </div>
          {/* email input */}
          <div className="mt-4">
            <input id="email" name="email" onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} type="email"  placeholder="Email" className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0"/>
          </div>
          {registerFormik.touched.email && registerFormik.errors.email ? (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.email}</p>
            ) : null}
          {/* password input */}
          <div className="mt-4 relative">
            <input id="password" name="password" onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} type={showPassword ? "text" : "password"}  placeholder="Password" className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0"/>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"  onClick={() => setShowPassword(!showPassword)}> {showPassword ? <IoMdEye /> : <FaEyeSlash />}</span>
          </div>
          {registerFormik.touched.password && registerFormik.errors.password ? (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.password}</p>
            ) : null}
          {/* rePassword input */}
          <div className="mt-4 relative">
            <input id="cPassword" name="cPassword" onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.cPassword} type={showConfirmPassword ? "text" : "password"}  placeholder="Confirm Password" className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0"/>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <IoMdEye /> : <FaEyeSlash />}</span>
          </div>
          {registerFormik.touched.rePassword && registerFormik.errors.rePassword ? (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.rePassword}</p>
            ) : null}
          {/* create account button */}
          <button type="submit" className="w-full bg-[#6B8EAE] tracking-wider  text-sm sm:text-base text-white p-2 rounded-lg mt-6 hover:bg-[#4F7292] hover:scale-[102%] hover:transition-all duration-200 " > Create Account</button>
        </form>
        {/* register with google word */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-3 text-gray-600">Or register with</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {/* google button */}
        <button className="flex items-center justify-center w-full border border-gray-300 shadow bg-white text-md  p-2 rounded-lg hover:bg-gray-50 hover:scale-[102%] hover:transition-all duration-200 ease-in-out ">
          <FcGoogle className="text-2xl mr-1.5"/> Google
        </button>
      </div>
    </div>
  );
};

export default Register;
