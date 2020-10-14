import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import products from '../products';
import Product from "../components/Product";


class HomeScreen extends Component {

    render() {
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
}

export default HomeScreen;