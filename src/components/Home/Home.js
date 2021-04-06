import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Products from '../Products/Products';
import './Home.css'
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:27017/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [products])
    return (
        <>
            {loading ? <div className="text-center"><Spinner animation="border" /></div> :
                <div className="row justify-content-center align-items-center">
                    {
                        products.map(pd => <Products key={pd.key} product={pd}></Products>)
                    }
                </div>}
        </>
    );
};

export default Home;