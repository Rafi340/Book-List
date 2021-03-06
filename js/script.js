//get html ui element
let form = document.querySelector('#book-form');
let bl = document.querySelector('#booklist'); // booklist

class Book{
    constructor(title, author, isbn){
        this.title= title;
        this.author= author;
        this.isbn= isbn;
    }
}

class UI{
    constructor(){

    }
    static addToBooklist(book){
        let list = document.querySelector('#booklist');
        let row = document.querySelector('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`
        
        list.appendChild(row);
       
    }
    static clear(){
        document.querySelector("#title").value ='';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    static showAlert(message, className ){
        let div = document.createElement('div');
        div.className = `alert ${className}` ;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFromBook(target)
    {

        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            store.dltformls(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book Delete from Ypur Library' , 'success');
        }
       // console.log(target);
    }
}
class store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book) // for local storage
    {
        let books = store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static showbooklist(){
        let books = store.getBooks();
        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }
    static dltformls(isbn){
        let books = store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn == isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

form.addEventListener('submit', addBook);
bl.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', store.showbooklist());

function addBook(e){
   
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
    //let uii = new UI();
    if(title == '' || author == '' || isbn == ''){
        uii.showAlert("Please fill al the fields!!", "error");
    }else{
        let book = new Book(title , author, isbn);
        // console.log(author);
        // console.log(book);
          
         
         UI.addToBooklist(book);
         UI.clear();
         UI.showAlert("Good Job for Add Book in Your Library !!", "success");

         
         store.addBooks(book);
    }
    e.preventDefault();
    
   /* let book = new Book(title , author, isbn);
   // console.log(author);
   // console.log(book);
     
    let uii = new UI();
    uii.addToBooklist(book);

    uii.clear();*/
    
   
}

function deleteBook(e){
   // let uii = new UI();
    UI.deleteFromBook(e.target);
    
    e.preventDefault();
}