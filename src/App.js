import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Header/>
                <main className='py-3'>
                    <Container className='text-center'>
                        <h1>
                            Learn React, rob, steal and grab your goose
                        </h1>
                        <Route path='/' component={HomeScreen} exact/>
                        <Route path='/product/:id' component={ProductScreen}/>
                    </Container>
                </main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
