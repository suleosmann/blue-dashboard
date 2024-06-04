import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import Logo from "../../assets/logoRed.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        navigate('/dashboard'); 
        
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col items-center mt-28 bg-white">
                <img
                    src={Logo}
                    alt="Kenya Red Cross"
                    className="-mt-32"
                />
                <h1 className="text-4xl font-bold font-sans mb-4">Digital Fundraising Platform</h1>
                <form className="w-full max-w-xlg text-center px-20" onSubmit={handleSubmit}>
                    <h2 className="text-lg mb-6">Sign In</h2>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 w-full h-16"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 w-full h-16"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-custom-red text-white py-2 px-8 rounded-md mb-4 w-full h-16">
                        Sign In
                    </button>
                    {error && <div className="text-custom-red text-sm mt-2">{error}</div>}
                </form>
                <a href="#" className="text-custom-red text-sm">Forgot Password? Reset</a>
            </div>
            <div className="w-full md:w-1/2 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://www.redcross.or.ke/wp-content/uploads/2023/08/Our-brief-but-rich-history-1170x640-1.jpg')" }}></div>
        </div>
    );
};

export default Login;
