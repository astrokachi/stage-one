import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);

	if (req.method === "GET" && parsedUrl.pathname === "/api") {
		const { slack_name, track } = parsedUrl.query;
		const date = new Date();

		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		const resp = {
			slack_name,
			current_day: days[date.getDay()],
			utc_time: date.toISOString().replace(/\.\d+/, ""),
			track,
			github_file_url:
				"https://github.com/astrokachi/stage-one/blob/main/src/index.ts",
			github_repo_url: "https://github.com/astrokachi/stage-one",
			status_code: 200,
		};

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(resp));
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found\n");
	}
});

server.listen(3001, () => {
	console.log("server is up and running");
});
