import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import authSlice from "../store/slices/auth";

const Product = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authSlice.actions.setLogout());
        history.push("/sign-in");
      };

    return (
        <form>
            <button type="submit" className="btn btn-primary btn-block" onClick={handleLogout}>Log Out</button>
        </form>
    );
}


export default Product;