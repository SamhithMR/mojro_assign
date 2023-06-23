// Book class represents a generic book
class Book {
  constructor(name, id, author, price, type) {
    this.name = name;
    this.id = id;
    this.author = author;
    this.price = price;
    this.type = type;
    this.available = true;
    this.issueDate = null;
    this.returnDate = null;
  }

  // Method to update price of book
  updatePrice(newPrice) {
    this.price = newPrice;
  }

  // Method to update the availability status of the book
  updateAvailability(status) {
    this.available = status;
  }

  // Method to update the issue date of the book
  updateIssueDate(date) {
    this.issueDate = date;
  }

  // method to update the return date of the book
  updateReturnDate(date) {
    this.returnDate = date;
  }
}

// ComicBook class extends  Book class
class ComicBook extends Book {
  constructor(name, id, author, price, type, isSubscriptionAvailable) {
    super(name, id, author, price, type);
    this.isSubscriptionAvailable = isSubscriptionAvailable;
  }

  // method to apply for monthly subscription
  applyForSubscription() {
    if (this.isSubscriptionAvailable) {
      console.log(`Subscription applied for ${this.name}`);
    } else {
      console.log(`Subscription not available for ${this.name}`);
    }
  }
}

// Library class manages the collection of books and provides various operations
class Library {
  // Constructor to initialize the library with an empty book collection
  constructor() {
    this.books = [];
  }

  // method to add a new book to the library
  addBook(book) {
    this.books.push(book);
  }

  // method to update the price of a book based on its ID
  updateBook(id, newPrice) {
    const book = this.findBookById(id);
    if (book) {
      book.updatePrice(newPrice);
      console.log(`Price updated for book ${book.name}`);
    } else {
      console.log(`Book with ID ${id} not found`);
    }
  }

  // method to list all the books in the library
  listBooks() {
    console.log("List of books:");
    this.books.forEach((book) => {
      console.log(`${book.name} - ${book.author}`);
    });
  }

  // method to search for books by a keyword
  searchBooks(keyword) {
    const matchedBooks = this.books.filter((book) => {
      const bookName = book.name.toLowerCase();
      const bookAuthor = book.author.toLowerCase();
      const bookId = book.id.toLowerCase();
      const searchKey = keyword.toLowerCase();
      return bookName.includes(searchKey) || bookAuthor.includes(searchKey) || bookId.includes(searchKey);
    });
    console.log(`Matching books for '${keyword}':`);
    matchedBooks.forEach((book) => {
      console.log(`${book.name} - ${book.author}`);
    });
  }

  // method to find a book by its ID
  findBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  // method to checkout a book based on its ID
  checkoutBook(id) {
    const book = this.findBookById(id);
    if (book) {
      if (book.available) {
        book.updateAvailability(false);
        const currentDate = new Date().toLocaleDateString();
        book.updateIssueDate(currentDate);
        console.log(`Book ${book.name} checked out successfully`);
      } else {
        console.log(`Book ${book.name} is not available`);
      }
    } else {
      console.log(`Book with ID ${id} not found`);
    }
  }

  // method to return a book based on its ID
  returnBook(id) {
    const book = this.findBookById(id);
    if (book) {
      if (!book.available) {
        book.updateAvailability(true);
        const currentDate = new Date().toLocaleDateString();
        book.updateReturnDate(currentDate);
        console.log(`Book ${book.name} returned successfully`);
      } else {
        console.log(`Book ${book.name} is already available`);
      }
    } else {
      console.log(`Book with ID ${id} not found`);
    }
  }
}

// Usage Example:
// Create a new library
const myLibrary = new Library();

// Add new books
const book1 = new Book("Book 1", "B001", "Author 1", 10, "History");
const book2 = new ComicBook("Comic Book 1", "CB001", "Author 2", 15, "Comic", true);
const book3 = new Book("Book 3", "B003", "Author 3", 12, "History");

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

// List all books in the library
myLibrary.listBooks();

// search for books by name
myLibrary.searchBooks("Book 1");

// search for books by author
myLibrary.searchBooks("Author 2");

// search for books by ID
myLibrary.searchBooks("B003");

// update book availability
myLibrary.checkoutBook("B001");

// try to checkout an already checked out book
myLibrary.checkoutBook("B001");

// return a book
myLibrary.returnBook("B001");

// apply for subscription (only for comic books)
book2.applyForSubscription();


class SpecialLibrary extends Library {
  constructor() {
    super();
  }
  
  checkoutBook(id) {
    const book = this.findBookById(id);
    if (book) {
      if (book.available) {
        book.updateAvailability(false);
        const currentDate = new Date().toLocaleDateString();
        book.updateIssueDate(currentDate);
        console.log(`Book ${book.name} checked out successfully from Special Library`);
      } else {
        console.log(`Book ${book.name} is not available in Special Library`);
      }
    } else {
      console.log(`Book with ID ${id} not found in Special Library`);
    }
  }
  
  returnBook(id) {
    const book = this.findBookById(id);
    if (book) {
      if (!book.available) {
        book.updateAvailability(true);
        const currentDate = new Date().toLocaleDateString();
        book.updateReturnDate(currentDate);
        console.log(`Book ${book.name} returned successfully to Special Library`);
      } else {
        console.log(`Book ${book.name} is already available in Special Library`);
      }
    } else {
      console.log(`Book with ID ${id} not found in Special Library`);
    }
  }
}

// create a new library
const mySpecialLibrary = new SpecialLibrary();

mySpecialLibrary.addBook(book1);
mySpecialLibrary.addBook(book2);
mySpecialLibrary.addBook(book3);

// List all books in the library
mySpecialLibrary.listBooks();
// check out a book from the special library
mySpecialLibrary.checkoutBook("B001");

// return a book to the special library
mySpecialLibrary.returnBook("B001");
