class IndexController {
    public getIndex(req: Request, res: Response): void {
        res.send("Welcome to the Biblioteca!");
    }

    public getBooks(req: Request, res: Response): void {
        // Logic to retrieve and return a list of books
    }

    public getBook(req: Request, res: Response): void {
        // Logic to retrieve and return a specific book by ID
    }

    public addBook(req: Request, res: Response): void {
        // Logic to add a new book
    }
}

export default IndexController;