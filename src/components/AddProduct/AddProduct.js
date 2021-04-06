import React, { useState } from 'react';
import { Form, Button, Nav, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './addProduct.css'
import axios from 'axios';
import manage from '../../icon/grid 1.png'
import add from '../../icon/plus 1.png'
import edit from '../../icon/edit 1.png'

const AddProduct = () => {
    const [data, setData] = useState({
        key: "",
        price: "",
        category: ""
    })

    const [image, setImage] = useState({
        image: ""
    })

    const hangleValue = (e) => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value;
        setData(newData)
    }
    const hangleFile = (e) => {
        const imageData = new FormData();
        imageData.set('key', 'd2bfea558227bc5d8f9aafe87815be50')
        imageData.append('image', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImage({
                    image: response.data.data.display_url
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newProduct = Object.assign(data, image);
        fetch('http://localhost:27017/add-products', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    const [validated, setValidated] = useState(false);

    const handleValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
            setValidated(true);
    };
    return (
        <>
            <div className="row py-4">
                <div className="col-lg-2 aside">
                    <div>
                        <h4>WeShopping</h4>
                        <Nav.Link className="text-white" as={Link} to="/manage-product"><Image className="admin-icon" src={manage}/>Manage Product</Nav.Link>
                        <Nav.Link className="text-white" as={Link} to="/add-product"><Image className="admin-icon" src={add}/>Add Product</Nav.Link>
                        <Nav.Link className="text-white" as={Link} to="/edit-product"><Image className="admin-icon" src={edit}/>Edit Product</Nav.Link>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div>
                        <h4 className="my-3">Add Product</h4>

                        <Form className="py-4"  noValidate validated={validated} onSubmit={handleValidation}>
                            <Form.Row>
                                <Form.Group as={Col} hasValidation>
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Control onChange={(e) => hangleValue(e)} id="category" value={data.category} type="text" placeholder="Enter category" required/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control onChange={(e) => hangleValue(e)} id="price" value={data.price} type="text" placeholder="Enter price" required/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Product Key</Form.Label>
                                    <Form.Control onChange={(e) => hangleValue(e)} id="key" value={data.key} type="text" placeholder="Enter key" required />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Add Photo</Form.Label>
                                    <Form.Control onChange={(e) => hangleFile(e)} type="file" required />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="success" onSubmit={(e) => handleSubmit(e)} type="submit">
                                Add Product
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;


