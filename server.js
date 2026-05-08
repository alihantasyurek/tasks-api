require("dotenv").config();
const express = require("express");
const setupSwagger = require("./config/swagger.js");

const app = express();
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
