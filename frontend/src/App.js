import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './screens/About';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


const App = () => {
    return (
        <div className="App">
            <Router>
                <Header/>
                <main className='py-3'>
                    <Container className='text-center'>
                        <Route path='/' component={HomeScreen} exact={true}/>
                        <Route path='/login' component={LoginScreen}/>
                        <Route path='/shipping' component={ShippingScreen}/>
                        <Route path='/payment' component={PaymentScreen}/>
                        <Route path='/placeorder' component={PlaceOrderScreen}/>
                        <Route path='/order/:id' component={OrderScreen}/>
                        <Route path='/register' component={RegisterScreen}/>
                        <Route path='/profile' component={ProfileScreen}/>
                        <Route path='/product/:id' component={ProductScreen}/>
                        <Route path='/cart/:id?' component={CartScreen}/>
                        <Route path='/admin/userlist' component={UserListScreen}/>
                        <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
                        <Route path='/about' component={About}/>
                    </Container>
                </main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;