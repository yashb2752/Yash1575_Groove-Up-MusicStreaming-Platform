import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function TextWithHover({displayText, active, targetLink}){
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-start cursor-pointer' onClick={()=>{
                // console.log(targetLink);
                navigate(targetLink)
            }
        } 
        >

            <div className={`${active?"text-white":"text-gray-400"} font-semibold hover:text-white`}>
                {displayText}
            </div>
        </div>
    )
}