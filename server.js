var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;
const cors = require("cors");
app.use(
  cors({
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    credentials: true,
    origin: "*",
  })
);

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

//Product Data
var products = [
  {
    id: "001",
    productName: "White Basmathi Rice",
    unitPrice: "400",
    description:
      "White Basmathi Rice imported from pakistan. High quality rice with extra fragnance. Organically grown.",
  },
  {
    id: "002",
    productName: "Sugar",
    unitPrice: "200",
    description: "White sugar manufactured by Palwatte Factory",
  },

  {
    id: "003",
    productName: "Flour",
    unitPrice: "190",
    description: "Super fine whole grain general purpose flour",
  },
  {
    id: "004",
    productName: "Dhal",
    unitPrice: "200",
    description: "Imported mysoor dhal from India",
  },
];

//HTTP GET method
app.get("/api/products", (req, res, next) => {
  try{
    res.status(200).json({
      message: "success",
      data: products,
    });
  }
  catch(E){
    res.status(400).send(E);
  }
});

//HTTP POST method
app.post("/api/products", (req, res, next) => {
    try{
         const {
           productName,
           description,
           unitPrice,
         } = req.body;

         var lastId = products.length + 1;
         var newProduct = {
             id: "00" + lastId,
             productName: productName,
             unitPrice: unitPrice,
             description: description 
         };
         products.push(newProduct);

         res.status(200).json({
           message: "success",
           data: newProduct,
           id: newProduct.id
         });
    }
    catch(E){
        res.status(400).send(E); 
    }
});
