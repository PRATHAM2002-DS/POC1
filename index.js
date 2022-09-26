let express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
const connection = require("./db/connect");

const botRouter = require("./routes/botRoutes");

const PORT = 8000;

let app = express();
// pool
//   .then(function (p) {
//     return p.getConnection();
//   })
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

// pool.getConnection();

// connection.connect();
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", botRouter);
app.listen(PORT, () =>
  console.log(`Server is successfully running on PORT ${PORT}`)
);
