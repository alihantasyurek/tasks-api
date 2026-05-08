require("dotenv").config();
const express = require("express");
const setupSwagger = require("./config/swagger.js");

const app = express();
setupSwagger(app);
app.use(express.json());

app.use("/auth", require("./routes/auth.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
