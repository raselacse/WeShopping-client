import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Button, Table, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { key } = useParams()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState({
        date: new Date()
    });

    useEffect(()=>{
        fetch('https://still-chamber-88739.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    },[])

    const product = products.find(pd => pd.key === key)
    
    const handleOrder = () => {
        const order = { ...loggedInUser, ...product, ...selectedDate};
        fetch('https://still-chamber-88739.herokuapp.com/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
    
    return (
        <>{loading ? <div className="text-center"><Spinner animation="border" /></div> :
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
                            <td>{product.title}</td>
                            <td>{1}</td>
                            <td>${product.price}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>${product.price}</td>
                        </tr>
                    </tbody>
                </Table>
                <p className="f-right">
                    <Button onClick={handleOrder} as={Link} to="/orders" variant="primary">Order Now</Button>
                </p>
            </Jumbotron>}
        </>
    );
};

export default Checkout;