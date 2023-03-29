require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

//middleware
app.use(express.json()); //adds req.body as JSON

//GET all restaurants
app.get(`/api/v1/restaurants`, async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

//retrieve one restaurant

app.get(`/api/v1/restaurants/:id`, async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: {
            restaurants: results.rows[0],
          },
        });
      } catch (err) {
        console.error(err);
      }
});

//create restaurant

app.post(`/api/v1/restaurants`, async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(200).json({
          status: "success",
          data: {
            restaurants: results.rows[0],
          },
        });
      } catch (err) {
        console.error(err);
      }
});

//update restaurant

app.put(`/api/v1/restaurants/:id`, async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
          status: "success",
          data: {
            restaurants: results.rows[0],
          },
        });
      } catch (err) {
        console.error(err);
      }
});

//delete restaurant

app.delete(`/api/v1/restaurants/:id`, async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(204).json({
          status: "success"
        });
      } catch (err) {
        console.error(err);
      }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
