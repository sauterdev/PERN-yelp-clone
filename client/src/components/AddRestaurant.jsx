import React, { useContext, useState } from "react";
//axios import
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurants);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)} //state update for location input field
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)} //state update for location input field
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)} //state update for price input field
              className="form-control custom-select "
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
