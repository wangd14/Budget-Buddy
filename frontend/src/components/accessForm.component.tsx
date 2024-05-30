import React from 'react';
import Button from './button.component';

interface AccessFormProps {
  text: string;
}

const AccessForm: React.FC<AccessFormProps> = ({ text }) => {
    return (
        <form className="w-full max-w-lg mx-auto border rounded py-2 px-4 my-20"> 
            <div className="mb-4">
                <label className="block text-white font-bold mb-2">Username</label>
                <input id="username" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="mb-4">
                <label className="block text-white font-bold mb-2">Password</label>
                <input id="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline"></input>
            </div>
            <div className="flex items-center justify-between">
                <Button text={text} url="../welcome" />
                <a href="#" className="inline-block align-baseline font-bold text-sm hover:underline text-white">Forgot Password?</a>
            </div>
        </form>
    );
};

export default AccessForm;
