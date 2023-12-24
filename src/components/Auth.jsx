import React, {useState} from 'react';
import { TextField,  Button } from "@mui/material";
import axios from "axios";
import {NavLink} from "react-router-dom";

const Auth = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (name == '') {
            setNameError(true)
        }

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }

        if (name && email && password) {
            console.log(name, email, password);
            const user = {
                "email" : email,
                "password" : password,
                "fullName" : name,
            }
            await axios.post('http://localhost:8005/auth/signup', user);
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit} className={"form"}>
                <h2>Регистрация</h2>
                <TextField
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={name}
                    fullWidth
                    sx={{mb: 3}}
                    error={nameError}
                />
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
                <NavLink className={"link"} to={'/login'}>Войти</NavLink>
                <Button className={"light-blue darken-1"} variant="outlined" color="secondary" type="submit">Зарегистрироваться</Button>

            </form>
        </React.Fragment>
    );
};

export default Auth;