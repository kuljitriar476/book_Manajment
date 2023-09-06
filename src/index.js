const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://kuljitriar476:J2vo1lN9QlB2XCtL@cluster0.cbrqpfb.mongodb.net/",
    {
      UseNewUrlParser: true,
    }
  )

  .then(() => console.log("mongoDB is  connected"))
  .catch((err) => console.log(err));
// app.use(cors());

app.use("/", route);

app.listen(process.env.PORT || 4000, function () {
  console.log("server app listening on port " + (process.env.PORT || 4000));
});
