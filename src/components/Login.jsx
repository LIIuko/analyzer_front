import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {NavLink} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }

        if (email && password) {
            console.log(email, password);
            const user = {
                "email": email,
                "password": password,
            }
            const response = await axios.post('http://localhost:8005/auth/login', user);
            if (response?.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
            } else {
                alert("Неверные данные");
            }

        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit} className={"form"}>
                <h2>Войти</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                />
                <NavLink className={"link"} to={'/auth'}>Зарегистрироваться</NavLink>
                <Button className={"light-blue darken-1"} variant="outlined" color="secondary"
                        type="submit">Войти</Button>

            </form>
        </React.Fragment>
    );
};

export default Login;