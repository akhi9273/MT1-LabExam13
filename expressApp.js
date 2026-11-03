
import express from "express";

const app = express();

app.use(express.json());

// Sample books
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
    },
    {
        id: 3,
        title: "Python Programming",
        author: "Guido van Rossum",
        price: 700
    }
];

// GET - All books
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET - Book by ID
app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

// POST - Add new book
app.post("/books", (req, res) => {
    const { id, title, author, price } = req.body;

    if (!id || !title || !author || price === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    books.push({ id, title, author, price });

    res.status(201).json({
        message: "Book added successfully",
        book: { id, title, author, price }
    });
});

// PUT - Update book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.price = req.body.price ?? book.price;

    res.json({
        message: "Book updated successfully",
        book
    });
});

// DELETE - Remove book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start server
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});
