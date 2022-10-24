const connectToMongo = require("./db");
let cors = require('cors')
connectToMongo();

const express = require("express");
const app = express();
const port = 5000;

//using a middleware to send request in JSON format
app.use(cors());
app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`);
});
