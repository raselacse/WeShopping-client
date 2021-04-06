import { Button, Card, CardDeck } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'

const Products = (props) => {
    const { category, image, price, key } = props.product;

    return (
        <>
            <CardDeck className="text-center py-3 mx-0 px-0 col-md-6 col-lg-3">
                <Card>
                    <Card.Img variant="top pt-3 m-auto img" src={image} />
                    <Card.Body>
                        <Card.Title>{category}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Title>Price: ${price}</Card.Title>
                        <Button as={Link} to={"checkout/" + key} variant="primary">Buy Now</Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </> 
    );
};

export default Products;