import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";

function Register(props) {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = (emailR, passwordR, usernameR) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/auth/register/`,
                {
                    email: emailR,
                    password: passwordR,
                    username: usernameR
                },
                )
            .then(() => {
                setMessage("User Succesfully Registered");
            })
            .catch((err) => {
                console.log(err);

                if(err.response.data.detail){
                    setMessage(err.response.data.detail.toString());
                }
                else{
                    setMessage(err.toString())
                }
                
            });
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
        },
        onSubmit: (values) => {
            setLoading(true);
            handleRegister(values.email, values.password, values.username);
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().required("Email is required"),
            password: Yup.string().trim().required("Password is required"),
            username: Yup.string().trim().required("Username is required"),
        }),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Username</label>
                <input id="username" type="text" className="form-control" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.username ? <div>{formik.errors.username} </div> : null}
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input id="email" type="email" className="form-control" placeholder="Enter email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            </div>

            <div className="form-group">
                <label>Password</label>
                <input id="password" type="password" className="form-control" placeholder="Enter password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password ? (
                    <div>{formik.errors.password} </div>
                ) : null}
            </div>
            <div hidden={false}>
                {message}
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Submit</button>
        </form>
    );
}

export default Register;