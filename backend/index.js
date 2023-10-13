import axios from "axios";

import express, { query } from "express";
var app = express();

//avoiding CORS problem
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get("/", function (req, res) {  
  let url = `https://jsonplaceholder.typicode.com/users?_page=${req.query._page}&_limit=${req.query._limit}&q=${req.query.q}&_sort=${req.query._sort}&_order=${req.query._order}`
    axios
      .get(url)
      .then((response) => {
        res.status(200);
        res.send({'totalCount':parseInt(response.headers['x-total-count']), 'data':response.data});
      })
      .catch((error) => {
        res.status(404);
        res.send({})
      });
  }
);

app.get("*", function (req, res) {
  res.status(404);
  res.send("Invalid Request");
});

app.listen(3000);
