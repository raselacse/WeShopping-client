import React, { useEffect, useState } from 'react';
import { Nav, Button, Jumbotron, Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import manage from '../../icon/grid 1.png'
import add from '../../icon/plus 1.png'
import edit from '../../icon/edit 1.png'

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:27017/manage-products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])
    const deleteProduct = (e, id) => {
        fetch('http://localhost:27017/delete/' + id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    e.target.parentNode.parentNode.style.display = "none"
                }
            })
    }
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
                        <h4 className="my-3">Manage Products</h4>
                    <Jumbotron className="py-4">
                        <Table className="text-center" responsive>
                            <thead>
                                <tr>
                                    <th>Product Category</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(pd => <tr key={pd._id}>
                                    <td>{pd.category}</td>
                                    <td>{pd.price}</td>
                                    <td><Button onClick={(e) => deleteProduct(e, pd._id)}>Delete</Button></td>
                                </tr>)}

                            </tbody>
                        </Table>
                    </Jumbotron>
                </div>
            </div>
        </>
    );
};

export default ManageProduct;