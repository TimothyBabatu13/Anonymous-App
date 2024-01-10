import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ signUp, buttonText, path, routeText }) => {
    
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        signUp ? console.log("This is for signup") : console.log("This is for sign In")
        console.log(info)
    }

    const handleRoute = (e) =>{
        e.preventDefault();
        navigate(path)
    }
  return (
    <form action="">
        <input 
            type="email" 
            name="email" 
            id="email"
            placeholder="Input email"
            onChange={handleChange}
            value={info.email} 
        />
        <input 
            type="password" 
            name="password" 
            id="password"
            placeholder="Input password"
            onChange={handleChange}
            value={info.password} 
        />
        <button onClick={handleSubmit} type="submit">{buttonText}</button>
        <button onClick={handleRoute}>{routeText}</button>
    </form>
  )
}

export default Form