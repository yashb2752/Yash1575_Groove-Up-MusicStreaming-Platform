import React from 'react';

export default function PasswordInput({placeholder, label, className, value, setValue}){ // pass props as parameters
    return(

        <div className={`textInputDev space-y-2 w-full flex flex-col items-start ${className}` }>
            
            <label for={label} className="font-semibold">
                {label}
            </label>

            <input 
                className='w-full border border-solid border-gray-600 rounded p-3 placeholder-gray-600'
                type="password"
                placeholder={placeholder}
                id={label}
                value={value} // means that whatever prop 'value' we recieved while calling this component, set it to that comonents property 'value'
                onChange={(e) => {setValue(e.target.value)}} // means whever the value changes then set the value with updated value
            
            />

        </div>
    )
}