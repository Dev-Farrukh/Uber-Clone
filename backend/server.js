import app from "./src/app.js";
import http from "http"
import process from "node:process";
import envVariables from "./src/config/envConfig.js";
import dbConfiguration from "./src/config/dbConfig.js";
import { initializeSocket } from "./socket.js";

const PORT = envVariables.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server)

app.get("/", (req, res) => {
    res.send("Server is running");
});

try {
    await dbConfiguration();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}