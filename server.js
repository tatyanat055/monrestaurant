const http = require("http");
const app = require("./app");

const PORT = 2002;

const server = http.createServer(app);
const date = new Date();

server.listen(PORT, () => {
    console.log(
        `${date.toLocaleDateString()} ${date.toLocaleTimeString()} - Le serveur est activé au port : ${PORT}`
    );
});
