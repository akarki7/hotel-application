import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/form.css";
import { Button } from "react-bootstrap";

function Register() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = (emailR, passwordR) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/register/`,
                {
                    email: emailR,
                    password: passwordR
                },
            )
            .then(() => {
                setMessage("User Succesfully Registered");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.data.detail) {
                    setMessage(err.response.data.detail.toString());
                }
                else {
                    setMessage(err.toString())
                }

            });
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            setLoading(true);
            handleRegister(values.email, values.password);
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().required("Email is required"),
            password: Yup.string().trim().required("Password is required"),
        }),
    });

    return (
        <form>
            <h3>Sign Up</h3>

            <div className="form-group inside-container">
                <label>Email address</label>
                <input id="email" type="email" className="form-control" placeholder="Enter email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            </div>

            <div className="form-group inside-container">
                <label>Password</label>
                <input id="password" type="password" className="form-control" placeholder="Enter password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password ? (
                    <div>{formik.errors.password} </div>
                ) : null}
            </div>
            <div hidden={false}>
                {message}
            </div>
            <div className="form-button">
                <Button variant="primary" size="lg" className="button-color-logout" disabled={loading} onClick={formik.handleSubmit}>Submit</Button>
            </div>
        </form>
    );
}

export default Register;