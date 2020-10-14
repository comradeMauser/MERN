import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import products from '../products';
import Product from "./Product";


class HomeScreen extends Component {
    render() {
        return (
            <div>
                <h1>===latest products===</h1>
                <Row>
                    {products.map(item => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product product={item}/>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default HomeScreen;