const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const morgan =require("morgan");
//require("express-async-errors");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({extended:true}));
// routes
app.use("/books", bookRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));