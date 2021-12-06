import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import authSlice from "../store/slices/auth";
import { Button } from "react-bootstrap";
import "./css/form.css";

function Login(props) {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (email, password) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login/`, { email, password })
      .then((res) => {
        dispatch(
          authSlice.actions.setAuthTokens({
            token: res.data.access,
            refreshToken: res.data.refresh,
          })
        );
        dispatch(authSlice.actions.setAccount(res.data.user));
        setLoading(false);
        history.push("/product", {
          userId: res.data.id
        });
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data.detail.toString());
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email is required"),
      password: Yup.string().trim().required("Password is required"),
    }),
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={formik.handleSubmit}>
          <h3>Sign In</h3>

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
      </div>
    </div>
  );
}

export default Login;