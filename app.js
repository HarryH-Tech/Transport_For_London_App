const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const path = require("path");

// App
const app = express();
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//  DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// ... other app.use middleware
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// ...
// Right before your app.listen(), add this:
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
