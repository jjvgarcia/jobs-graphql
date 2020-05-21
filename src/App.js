import React from 'react';
import './App.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import JobList from "./pages/JobList";
import Routes from "./Routes";


function App() {

    return (
        <div>
            <Header/>
            <div style={{padding: 8}}>
                <Routes />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
