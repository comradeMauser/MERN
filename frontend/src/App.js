import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './screens/About';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


const App = () => {
    return (
        <div className="App">
            <Router>
                <Header/>
                <main className='py-3'>
                    <Container className='text-center'>
                        <Route path='/' component={HomeScreen} exact={true}/>
                        <Route path='/product/:id' component={ProductScreen}/>
                        <Route path='/cart/:id?' component={CartScreen}/>
                        <Route path='/about' component={About}/>
                    </Container>
                </main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;