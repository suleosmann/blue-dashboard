import React from 'react';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col items-center mt-44 bg-white">
                <img
                    src="https://www.redcross.or.ke/wp-content/uploads/2023/03/logo-203x114-1.png"
                    alt="Kenya Red Cross"
                    className="mb-8"
                />
                <h1 className="text-4xl font-bold font-sans mb-4">Digital Fundraising Platform</h1>
                <form className="w-full max-w-xlg text-center px-20">
                    <h2 className="text-lg mb-6">Reset Password</h2>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border bg-gray-100 border-gray-300 rounded-md px-4 py-2 w-full h-16"
                        />
                    </div>

                    <button onClick={handleClick} className="bg-custom-red text-white py-2 px-8 rounded-md mb-4 w-full h-16">
                        Submit
                    </button>
                </form>
                <a href="#" className="text-custom-red text-sm">Login</a>
            </div>
            <div className="w-full md:w-1/2 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://www.redcross.or.ke/wp-content/uploads/2023/08/Our-brief-but-rich-history-1170x640-1.jpg')" }}></div>
        </div>
    );
};

export default ForgotPassword;
