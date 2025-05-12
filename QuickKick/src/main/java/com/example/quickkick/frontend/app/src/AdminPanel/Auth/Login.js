import React from 'react';
import './login.css';
import {useNavigate} from "react-router-dom";
import Service from "../../repository/repository";

import {useAuth} from "./AuthContext";

const Login = () => {
    const [formData, setFormData] = React.useState({ username: '', password: '' });
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();


        setError("");
        try{
            Service.login(formData).then((response) => {login(); navigate("/admin" )}).catch((error) => {setError(error.message)});


        }catch (error){
            setError("An error occurred while logging in.");
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Најава</h2>

                <div className="form-group">
                    <label htmlFor="username">Корисничко име</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Внеси корисничко име"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Лозинка</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Внеси лозинка"
                        required
                    />
                </div>

                <button className="login-button" type="submit">Најави се!</button>
            </form>
        </div>
    );
};

export default Login;