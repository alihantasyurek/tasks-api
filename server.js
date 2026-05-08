require("dotenv").config();
const express = require("express");
const setupSwagger = require("./config/swagger.js");
const connectDB = require("./config/db.js");

connectDB();
const app = express();
app.use(express.json());
setupSwagger(app);

app.use("/auth", require("./routes/auth.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
