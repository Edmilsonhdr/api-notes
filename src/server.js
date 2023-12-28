const express = require("express");

const app = express();
app.use(express.json())

app.post("/users", (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
});


const PORT = 3333;

app.listen(PORT, () => console.log(`Server iniciado ${PORT}`));