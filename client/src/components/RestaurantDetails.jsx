import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
import StarRating from "./StarRating";

const RestaurantDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data.data);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>{selectedRestaurant && (
        <>
        <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}/>
            <AddReview/>
        </div>
        </>
      )}
      </div>
  )}
  

export default RestaurantDetails;
