import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import ReactDOM from 'react-dom';

import { Icon } from '@iconify/react'; 
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers'; // necessary for making call to the APIs at backend
import { useCookies } from 'react-cookie'; // necessary to access token from cookies 

import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';

export default function LoginComponent(){

    //⭐ lets create some states to store input field's data 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookie, setCookie] = useCookies(["token"]);  // state for cookies
    const navigate = useNavigate(); // state for navigation i.e for eg to navigate to home page ones user is logged in successfully

    const [displayLoading, setDisplayLoading] = useState(false);
    
    // this fuction will run whenever 'login' button is clicked
    const login = async () => {

        if(email.trim() === "" || password.trim() === ""){
            alert('fields should not be empty');
            return;
        }
        setDisplayLoading(true);
        const data = {email, password}; // fetch the data stored in useState 
        
        // now we have the data in json format, so lets send it to the fun 'makeUnauthenticatedPOSTRequest' which will later send it to the API at backend 
        const response = await makeUnauthenticatedPOSTRequest("/auth/login", data); // 
        setDisplayLoading(true);
        
        if(response && !response.err){ // if we did got a response ,and response does not have a 'err' key or error key that we send in the backend code
            // user exists and user credentials are stored in response (sent by the backend api of /auth/login)
            // console.log(response);
  
            // lets store the token of user into cookies for smooth authentication purpose (login)
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30); // set date to 30 days later coz we need to store cookies for 30 days only
            setCookie("token", token, {path: "/" ,expires: date}); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
            alert('log in successful');
            setDisplayLoading(false);
            navigate("/home"); // go to home page when user acc is created, used from 'useNavigate' hook state
        }else{
            setDisplayLoading(false);
            alert(response.err);
        }
    }
 
    return (

        <div className='w-full h-full flex flex-col items-center'>
            <div className="bg-app-purple bg-opacity-5 border border-app-purple-80 logo space-x-5 w-full flex justify-center p-2  border-gray-300 ">
                {/* <Icon icon="logos:spotify" width='130' /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#050516" d="M18.65.226A16 16 0 0 0 16 0C7.16 0 0 7.16 0 16c0 3.394 1.067 6.53 2.86 9.131c1.1-1.616 3.637-2.731 6.578-2.731c2.02 0 3.847.533 5.156 1.39zm8.502 4.315c2.763 6.11.339 9.374.339 9.374c-1.875-5.64-7.305-6.464-7.305-6.464s-3.572 19.248-3.572 19.49c0 2.085-2.214 3.847-5.22 4.38A16.01 16.01 0 0 0 16 32c8.84 0 16-7.16 16-16c0-4.493-1.859-8.55-4.848-11.459"/></svg>
                <div className='text-app-purple-light flex justify-center items-center font-bold text-2xl'>GrooveUp</div>
            
            </div>     

            <div className='inputRegion w-1/3 py-10 '>
                {/* will have 2 inputs email and pass and have my signup button */}
                <div className='font-bold mb-8'>
                    Log In Here
                </div>
                <TextInput 
                    label="Email ID or username" 
                    placeholder="Email ID or username" 
                    className="my-3"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput 
                    label="Password" 
                    placeholder="Password"
                    className="my-3"
                    value={password}
                    setValue={setPassword}
                />
                <div className='buttonContainer w-full flex justify-end my-5'>
                    <button className='w-full text-white bg-app-purple-light bg-opacity-70 font-semibold py-3 px-10 rounded hover:bg-opacity-90 transition delay-100' onClick={(e) => {
                        e.preventDefault();  // by default form buttons have some default behaviour, so this is how we prevent that 
                        login(); // call login function when one clicks the button
                    }}>
                        LOG IN
                    </button>
                </div>

                <div className='w-full border border-gray-300'> 
                </div>

                <div className='font-semibold my-5'>
                    Don't have an account ?
                </div>

                <div className='w-full border-2 border-gray-400 text-gray-700 py-3 rounded hover:bg-app-purple-light transition delay-100 hover:text-white hover:bg-opacity-80 hover:border-white cursor-pointer'>
                    <Link to="/signup">  {/* note : anchor is not efficient, link is efficient as it will load only those components that are changed, those unchanged will not be reloaded */}
                        Create New Account
                    </Link>
                </div>
                {
                    displayLoading?(
                        <div className='flex justify-center pt-5'>
                            <Icon icon="line-md:loading-loop"  fontSize={40}/>
                        </div>
                    ):(
                        <div className='flex justify-center pt-5'>
                            {/* <Icon icon="line-md:loading-loop"  fontSize={40}/> */}
                        </div>
                    )
                }
                

            </div>
            
        </div>
    
    )
}