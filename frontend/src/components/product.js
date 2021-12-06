import React, { useEffect, useState } from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@material-ui/core";
import "./css/product.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import NavigationLoggedIn from './Navigation_logged_in';

const Product = () => {
    const [propertyData, setPropertyData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://nba-players.herokuapp.com/players-stats')
            const propertyData_received = await response.json()
            // console.log("heck yeah "+ propertyData_received.payload[0].id)
            setPropertyData(propertyData_received.slice(0, 15))
        }
        fetchData()
    }, [])

    const handleFavourite = () => {

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
                                    <Card className="add-space">
                                        <Card.Img src="https://via.placeholder.com/150x75" />
                                        <Card.Body>
                                            <div className="card-lower">
                                                <div className="property-name">
                                                    <Card.Title>{propertyData.name}</Card.Title>
                                                </div>
                                                <div className="fav-icon">
                                                    <IconButton>
                                                        <FavoriteIcon style={{ color: "red" }} onClick={handleFavourite} />
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