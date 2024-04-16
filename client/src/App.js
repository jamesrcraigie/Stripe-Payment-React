import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Nav from "./components/Nav"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StripeSuccess from './pages/stripe-success';
import StripeCancel from './pages/stripe-cancel';

function App() {
    return (
        <Router>
            <Nav />
            <Toaster position="bottom-right" toastOptions={{
                duration: 2000
            }} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/stripe/success" element={<StripeSuccess />} />
                <Route exact path="/stripe/cancel" element={<StripeCancel />} />
            </Routes>
        </Router>
    );
}

export default App;
