import { React, useState, useContext } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [state, setState] = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("/register", {
                name,
                email,
                password
            });
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            }
            else {
                setName("");
                setEmail("");
                setPassword("");
                toast.success(`Hey, ${data.user.name}. You are part of the team. Congratulations!`);
                setState(data);
                localStorage.setItem('auth', JSON.stringify(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Try again.");
        }
    }

    return (
        <div className="d-flex justify-content-center" style={{ height: '80vh' }}>
            <div className="container align-items-center d-flex">
                <div className="row col-md-6 offset-md-3 text-center">
                    <h1 className="pt-5 fw-bold">Let's Get Started</h1>
                    <p className="lead pb-4">
                        Sign up for Free. No Credit Card Required
                    </p>
                    <div className="form-group">
                        <Input label="Name" value={name} setValue={setName} />
                        <Input label="Email" value={email} setValue={setEmail} type="email" />
                        <Input label="Password" value={password} setValue={setPassword} type="password" />

                        <div className="d-grid">
                            <Button handleClick={handleClick} type="danger" text="Register" size="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;