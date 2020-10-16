import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';


const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
            const fetchProducts = async () => {
                const {data} = await axios.get("/api/products")
                console.log(data)
                setProducts(data)
            };
            fetchProducts()
        }, []
    )

    return (
        <div>
            <h2>===latest products===</h2>
            <Row>
                {products.map(item => (
                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={item}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomeScreen;