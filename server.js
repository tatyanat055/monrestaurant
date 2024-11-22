const http = require('http');

const app = require('./app');

const numPort = 2002;

app.set("port", numPort);

const server = http.createServer(app);

const date = new Date ();

server.listen(numPort, () => {
    console.log(date.toLocaleDateString(), date.toLocaleTimeString(), "Le serveur est activé au port : ", numPort);
});