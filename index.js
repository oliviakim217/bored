import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.post("/", async (req, res) => {
  try {
    const filteredResponse = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const filteredArray = filteredResponse.data;
    const randomNumber = Math.floor(Math.random() * filteredArray.length); // 0-5
    const chosenActivity = filteredArray[randomNumber]; // a random activity
    console.log(chosenActivity);
  
    res.render("index.ejs", { data: chosenActivity }) 

  } catch (error) {
    console.error("Failed to make requests:", error.message);
    res.render("index.ejs", { error: "No activities that match your criteria." });
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
