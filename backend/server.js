import app from "./src/app.js";
import envVariables from "./src/config/envConfig.js";

const PORT = envVariables.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running");
});