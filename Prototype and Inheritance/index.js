function Book (title, author, year){
  this.title = title;
  this.author = author;
  this.year = year;
}

function EBook (obj, fileSize){
  Object.assign(this, obj)
  this.fileSize = fileSize;
  this.download = () => {
    console.log("download");
  }
}

Book.prototype.info = function() {
  console.log(this);
  console.log(`Book ${this.title}, author ${this.author}`);
}

EBook.prototype = Book.prototype

const firsBook = new Book('Shining', 'S.King', 1969);
const firstEBook = new EBook(firsBook, 1024);


console.log(firsBook);
console.log(firstEBook);

firsBook.info();
firstEBook.info();

firstEBook.download();