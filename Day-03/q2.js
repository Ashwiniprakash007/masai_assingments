const library = {
  books: [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
  ],

  //Book with validation
  addBook(book) {
    const { title, author, year } = book;

    // missing fields
    if (!title || !author || !year) {
      console.error("Book information is incomplete. Please provide title, author, and year.");
      return false; 
    }

    //Prevent duplicate titles
    const existing = this.findBookByTitle(title);
    if (existing) {
      console.error(`Book with title "${title}" already exists.`);
      return false;
    }

    this.books.push({ title, author, year });
    console.log(`Book "${title}" added successfully.`);
    return true;
  },

  //Find book by title
  findBookByTitle(title) {
    return this.books.find(book => book.title === title);
  },

  //Remove book by title
  removeBook(title) {
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      const removed = this.books.splice(index, 1);
      console.log(`Book "${removed[0].title}" removed successfully.`);
    } else {
      console.warn(`Book with title "${title}" not found.`);
    }
  }
};



console.log("Initial books:", library.books.length); 

library.addBook({ author: "George Orwell", year: 1949 }); 

library.addBook({ title: "1984", author: "George Orwell", year: 1949 }); 

console.log("After adding 1984:", library.books.length); 

library.addBook({ title: "1984", author: "George Orwell", year: 1949 }); 

library.removeBook("The Hobbit"); 

library.removeBook("Unknown Book"); 

console.log("Final books:", library.books);
