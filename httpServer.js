
import http from "http";
import fs from "fs";

let books = [
    {
        id: 1,
        title: "C++ Programming",
        author: "Bjarne Stroustrup",
        price: 500
    },
    {
        id: 2,
        title: "Java Programming",
        author: "James Gosling",
        price: 600
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome to Library Management System</h1>");
    }

    // GET /books
    else if (req.method === "GET" && req.url === "/books") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(books));
    }

    // GET /about
    else if (req.method === "GET" && req.url === "/about") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            app: "Library Book Management",
            version: "1.0"
        }));
    }

    // GET /home
    else if (req.method === "GET" && req.url === "/home") {
        fs.readFile("./public/index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading HTML file");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }

    // POST /add-book
    else if (req.method === "POST" && req.url === "/add-book") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const newBook = JSON.parse(body);

                if (
                    !newBook.id ||
                    !newBook.title ||
                    !newBook.author ||
                    newBook.price === undefined
                ) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "All fields are required" }));
                    return;
                }

                books.push(newBook);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Book added successfully",
                    book: newBook
                }));

            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid JSON data" }));
            }
        });
    }

    // Invalid route
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
