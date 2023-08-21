require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFoundMiddleware = require("./middlewares/notfound");
const errorMiddleware = require("./middlewares/error");
const locationRoute = require("./routes/locationRoute");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("combined"));
}

app.use(cors());
app.use(express.json());

app.use("/api", locationRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is running on port ", port);
});
