import React from 'react'
import { useState } from "react";
import GenderCheckbox from './GenderCheckBox'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuthContext } from "../../context/AuthContext";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const navigate = useNavigate()
    // const { loading, signup } = useSignup();

    const { setAuthUser } = useAuthContext();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!inputs.fullName || !inputs.username || !inputs.password || !inputs.confirmPassword || !inputs.gender) {
            alert("Please fill all fields");
            return;
        }

        if (inputs.password !== inputs.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const data = await axios.post("/api/auth/signup", {
                fullname: inputs.fullName,
                username: inputs.username,
                password: inputs.password,
                gender: inputs.gender
            })
            if (data) {
                localStorage.setItem("chat-user", JSON.stringify(data))
                setAuthUser(data)
                alert("Sign-Up Successfully")
                navigate('/login')
            } else {
                alert("Sign-Up failed")
                navigate('/signup')
            }
        } catch (error) {
            console.log(error)
        }


    };
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered  h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link
                        to={"/login"}
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
                        href='#'
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' >
                            {/* {loading ? <span className='loading loading-spinner'></span> : "Sign Up"} */}
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
