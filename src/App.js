import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';


const App = () => {
    return (
        <div className="App">
            <Header/>
            <main className='py-3'>
                <Container className='text-center'>
                    <h1>
                        Learn React, rob, steal and grab your goose
                    </h1>
                </Container>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
