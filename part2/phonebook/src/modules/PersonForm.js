import React from "react";
import InputData from "./InputData";

const PersonForm = ({onSubmit, newName, handleName, newNumber, handleNumber}) => (
    <form onSubmit={onSubmit}>
        <InputData label="Name:" id="name" type="text" value={newName} onChange={handleName}/>
        <InputData label="Number:" id="number" value={newNumber} onChange={handleNumber}/>
        <div>
            <button className="submit" type="submit">add</button>
        </div>
    </form>
)
export default PersonForm;