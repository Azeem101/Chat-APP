import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios"
const Login = () => {

    const navigate = useNavigate()
    const { setAuthUser } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("came in function")

        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }


        try {
            const data = await axios.post("/api/auth/login", {
                username,
                password,
            })
            if (data) {
                localStorage.setItem("chat-user", JSON.stringify(data))
                setAuthUser(data)
                alert("Login Successfully")
                navigate('/login')
            } else {
                alert("Login failed")
                navigate('/Login')
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={handleUsernameChange}
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
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                            {"Don't"} have an account?
                        </Link>
                        <button type='submit' className='btn btn-block btn-sm mt-2'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
