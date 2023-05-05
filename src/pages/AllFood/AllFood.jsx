import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import './AllFood.css'

const AllFood = () => {
  const [dataFood, setDataFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/foods`, { headers });
        setDataFood(response.data.data);
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };


    fetchData();
  }, []);
  console.log(dataFood)
  
  return (
    <Container fluid className="py-5 min-vh-100 ">
         <h1 className="title text-center">All Food</h1>
      <div className="d-flex flex-wrap justify-content-center">
      {dataFood.map((food) => (
          <Card key={food.id} style={{ width: "18rem", marginBottom: "30px", marginRight: "20px" }}>
            <Card.Img variant="top" src={food.imageUrl} alt="recipe image"  className="card-img" />
            <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Button variant="warning">View Recipe</Button>
            </Card.Body>
          </Card>
        ))
     }
      </div>
    </Container>
  );
  
};

export default AllFood;
