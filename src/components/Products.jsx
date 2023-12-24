import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";

const Products = () => {
    const params = useParams();
    const prodId = params.id;
    const [products, setProducts] = useState([]);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [avg, setAvg] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8005/caseproduct/get/${prodId}`;
        const fetchData = async () => {
            await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(resp => {
                setProducts(resp.data);
            });
        }
        fetchData();

    }, []);





    return (
        <>
            <NavLink className={"link link__back"} to={'/'}>назад</NavLink>
            <NavLink className={"link link__back"} to={'/'}>Выйти</NavLink>
            <h1 className={"products"}>{products.title}</h1>
            <table className={"striped table"}>
                <thead>
                <tr>
                    <th>Наименьшая цена</th>
                    <th>Средняя цена</th>
                    <th>Наибольшая цена</th>
                </tr>
                </thead>
                    <tbody>
                    <tr>
                        <td>68999</td>
                        <td>80520</td>
                        <td>113099</td>
                    </tr>
                    </tbody>
            </table>
            <table className={"striped table"}>
                <thead>
                <tr>
                    <th>Магазин</th>
                    <th>Название</th>
                    <th>Ссылка</th>
                    <th>Цена</th>
                </tr>
                </thead>
                {
                    products?.products?.map(product => (
                        <tbody key={product.id}>
                        <tr>
                            <td>{product.shop}</td>
                            <td>{products.title}</td>
                            <td><a href={product.url}>Ссылка</a></td>
                            <td>{product.price}</td>
                        </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    );
}

export default Products;