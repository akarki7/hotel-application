import React, { useEffect, useState } from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@material-ui/core";
import "./css/product.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import NavigationLoggedIn from './Navigation_logged_in';
import { useSelector } from "react-redux";
import store from '../store';
import axios from 'axios';

const Product = () => {
    var userID;
    var token;

    var fav_list = [];

    const [db_data, setDbData] = useState([]);
    const [propertyData, setPropertyData] = useState([]);

    const account = useSelector((state) => state.auth.account);
    if (account) {
        userID = account.id;
        token = store.getState().auth.token;
    }

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        const getDataDatabase = () => {
            const webApiUrl = `${process.env.REACT_APP_API_URL}/properties/?user_id=${userID}`;
            axios
                .get(webApiUrl, { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    setDbData(res.data);
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        const fetchData = async () => {
            const response = await fetch('https://api.limehome.com/properties/v1/public/properties')
            const propertyData_received = await response.json()
            // call database endpoint using /properties/user_id
            //compare the properties.id from backend to properties.id in frontend and do something for the favourites icon
            getDataDatabase();
            setPropertyData(propertyData_received.payload)
        }
        fetchData()
    }, [])

    for (var i = 0; i < db_data.length; i++) {
        fav_list.push(Number(db_data[i].property_id));
    }

    const capitalizeName = (str) => {
        const arr = str.split(" ");
        //loop through each element of the array and capitalize the first letter.
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        //Join all the elements of the array back into a string 
        //using a blankspace as a separator 
        const str2 = arr.join(" ");
        return str2;
    }

    const DeleteDataFromDatabase = (property) => {
        var bodyFormData = new FormData();
        bodyFormData.append('property_id', property.id);
        bodyFormData.append('users', userID);

        const webApiUrl = `${process.env.REACT_APP_API_URL}/properties/${property.id}/`;
        axios({
            method: "patch",
            url: webApiUrl,
            data: bodyFormData,
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then((res) => {
                console.log("succesfully deleted");
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const AddDataToDatabase = (property) => {
        var bodyFormData = new FormData();
        bodyFormData.append('property_id', property.id);
        bodyFormData.append('name', property.name);
        bodyFormData.append('city', property.location.city);
        bodyFormData.append('country', property.location.countryName);
        bodyFormData.append('image_url', property.images[0].url);
        bodyFormData.append('users', userID);


        const webApiUrl = `${process.env.REACT_APP_API_URL}/properties/`;
        axios({
            method: "post",
            url: webApiUrl,
            data: bodyFormData,
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then((res) => {
                console.log("Added to favs");
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleFavourite = (property) => {
        //if wanting to unfavourtie
        console.log("Here");
        var clicked_property_id = property.id;
        if (containsObject(clicked_property_id, fav_list)) {
            fav_list = fav_list.filter(function (item) {
                return item !== clicked_property_id;
            })
            //call database delete
            DeleteDataFromDatabase(property);
        }
        else //if wanting to make it favourite
        {
            fav_list.push(clicked_property_id);
            AddDataToDatabase(property);
        }
    };
    return (
        <>
            <div className="main-container">
                <NavigationLoggedIn />
                <div className="container-product">
                    <Container>
                        <Row >
                            {propertyData.map((propertyData, k) => (
                                <Col key={k} xs={12} md={4} lg={3}>
                                    <Card className="property-card">
                                        <Card.Img src={propertyData.images[0].url} />
                                        <Card.Body>
                                            <div className="card-lower">
                                                <div className="property-name">
                                                    <Card.Title>{capitalizeName(propertyData.name)}</Card.Title>
                                                </div>
                                                <div className="fav-icon">
                                                    <IconButton onClick={() => handleFavourite(propertyData)}>
                                                        <FavoriteIcon style={{ color: containsObject(propertyData.id, fav_list) ? "red" : 'none' }} />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}


export default Product;