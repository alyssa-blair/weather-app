import { createServer } from 'http';
import express from 'express';
const app = express();

const hostname = '127.0.0.10';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.listen((5000), () => {
    console.log("Nodedom");
});