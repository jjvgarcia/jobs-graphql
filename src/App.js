import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Routes from "./Routes";


function App() {
    return (
        <div>
            <Header/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <div style={{padding: 8}}>
                <Routes />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
