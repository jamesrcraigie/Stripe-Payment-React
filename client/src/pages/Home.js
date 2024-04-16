import axios from "axios";
import { React, useEffect, useState, useContext } from 'react';
import PriceCard from '../components/cards/PriceCard';
import { UserContext } from "../context";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [state, setState] = useContext(UserContext);
    const [prices, setPrices] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        const { data } = await axios.get("/prices");
        console.log("prices get request", data)
        setPrices(data);
    };

    const handleClick = async (e, price) => {
        e.preventDefault();
        if (state && state.token) {
            const { data } = await axios.post('/create-subscription', {
                priceId: price.id
            });
            console.log(JSON.stringify(data));
            window.open(data);
        } else {
            navigate("/register")
        }
    };

    return (
        <div className="container-fluid">
            <div className="row col-md-6 offset-md-3 text-center">
                <h1 className="pt-5 fw-bold">Explore the right plan for your business</h1>
                <p className="lead pb-4">
                    Choose a plan that suits you best. 
                </p>
            </div>
            <div className="row pt-5 mb-3 text-center">
                {prices && prices.map((price) => (<PriceCard price={price} key={price.id} handleSubscription={handleClick} />))}
            </div>
        </div>
    );
};

export default Home;