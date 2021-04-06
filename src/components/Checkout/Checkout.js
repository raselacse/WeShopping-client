import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import fakeData from '../../fakeData';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { key } = useParams()
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:27017/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])
    
    const product = fakeData.find(pd => pd.key === key)    
    const { title, category, price, image } = product;
    const productDetails = {title, category, price, image}

    const [selectedDate, setSelectedDate] = useState({
        date: new Date()
    });

    const handleOrder = () => {
        const order = { ...loggedInUser, ...productDetails, ...selectedDate};
        fetch('http://localhost:27017/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    
    return (
        <>
            <Jumbotron className="mt-5 py-4">
                <h4 className="py-2">Checkout</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{title}</td>
                            <td>{1}</td>
                            <td>${price}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>${price}</td>
                        </tr>
                    </tbody>
                </Table>
                <p className="f-right">
                    <Button onClick={handleOrder} as={Link} to="/orders" variant="primary">Order Now</Button>
                </p>
            </Jumbotron>
        </>
    );
};

export default Checkout;