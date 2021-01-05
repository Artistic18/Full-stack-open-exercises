import React from 'react';

const InputData = ({id, label, type, value, onChange }) => {
    return (
    <div>
       <label className="label" htmlFor={id}>
           {label}
       </label>
       <input
           type={type}
           className="input"
           id={id}
           value={value}
           onChange={onChange}
       />
    </div>
    )
}

export default InputData;