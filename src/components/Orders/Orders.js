import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { UserContext } from '../../App';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:27017/order-details?email=' + loggedInUser.email, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [loggedInUser.email, orders])
    return (
        <div className="pt-5">
            <h3>Your Orders</h3>
            <hr/>
            {
                orders.map(order => <Jumbotron className="row justify-content-around align-items-center" key={order._id}>
                        <div className="img col-lg-3">
                            <img style={{width:"150px", height:"150px"}} src={order.image} alt=""/>
                        </div>
                        <div className="content col-lg-7">
                            <h4>{order.title}</h4>
                            <p>Category: {order.category}</p>
                            <p><small>Order Date: {moment(new Date(order.date)).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
                        </div>
                        <div className="price col-lg-2">
                            <h6>Price: ${order.price}</h6>
                        </div>
                    </Jumbotron>
                )
            }
        </div>
    );
};

export default Orders;