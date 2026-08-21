import app from "./src/app.js";
import http from "http"
import envVariables from "./src/config/envConfig.js";
import { initializeSocket } from "./socket.js";

const PORT = envVariables.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running");
});