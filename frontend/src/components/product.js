import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import authSlice from "../store/slices/auth";

const Product = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authSlice.actions.setLogout());
        history.push("/login");
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <button type="submit" className="btn btn-primary btn-block" onClick={handleLogout}>Log Out</button>
                </form>
            </div>
        </div>
    );
}


export default Product;