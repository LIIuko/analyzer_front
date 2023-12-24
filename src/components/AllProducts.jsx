import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {NavLink} from "react-router-dom";

const AllProducts = () => {
    const [caseProducts, setCaseProducts] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        const url = `http://localhost:8005/caseproduct/get`;
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${token}`);
        const response = axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(resp => {
            setCaseProducts(resp.data);
        });
    }, []);

    const [query, setQuery] = useState("")
    const [queryError, setQueryError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setQueryError(false)

        if (query == '') {
            setQueryError(true)
        }

        if (query) {
            await axios.post(`http://localhost:8005/caseproduct/add?title=${query}`).then(resp => setCaseProducts(prevState => [...prevState, resp.data]));
        }
    }

    const deleteHandler = async (event, id) => {
        event.preventDefault();
        await axios.delete("http://localhost:8005/caseproduct/delete/" + id);
        setCaseProducts(prevState => prevState.filter(pId => pId!== id));
    }

    const updateHandler = async (event, id) => {
        event.preventDefault();
        await axios.patch("http://localhost:8005/caseproduct/update/" + id);
        setCaseProducts(prevState => prevState.filter(pId => pId!== id));
    }

    return (
        <>
            <React.Fragment>
                <form autoComplete="off" onSubmit={handleSubmit} className={"form"}>
                    <h2>Поиск</h2>
                    <TextField
                        label="Search"
                        onChange={e => setQuery(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        sx={{mb: 3}}
                        fullWidth
                        value={query}
                        error={queryError}
                    />
                    <Button className={"light-blue darken-1"} variant="outlined" color="secondary"
                            type="submit">Поиск</Button>

                </form>
            </React.Fragment>

            <h1 className={"products"}>Ваши выбранные товары</h1>
            <table className={"striped table"}>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Ссылка</th>
                    <th>Обновить</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                {
                    caseProducts.map(caseProducts => (
                        <tbody key={caseProducts.id}>
                        <tr>
                            <td>{caseProducts.title}</td>
                            <td><NavLink className={"link"} to={"http://localhost:3000/product/" + caseProducts.id}>Перейти</NavLink></td>
                            <td><i className={"button material-icons"} onClick={event => updateHandler(event, caseProducts.id)}>Обновить</i></td>
                            <td><i className={"button material-icons red-text"} onClick={event => deleteHandler(event, caseProducts.id)}>Удалить</i></td>
                        </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    );
};

export default AllProducts;