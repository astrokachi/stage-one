import http from "http";

const server = http.createServer();


server.listen(3000, () => {
	console.log("server is up and running");
});
