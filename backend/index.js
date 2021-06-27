const express = require("express");
const cors = require("cors");
const port = 4000;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Routes
app.use("/persons", require("./routes/person"));
app.use("/company", require("./routes/company"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
