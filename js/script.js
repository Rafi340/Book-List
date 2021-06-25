//get html ui element
let form = document.querySelector('#book-form');

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
    addToBooklist(book){
        let list = document.querySelector('#booklist');
        let row = document.querySelector('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`
        
        list.appendChild(row);
       
    }
    clear(){
        document.querySelector("#title").value ='';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    showAlert(message, className ){
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
}

form.addEventListener('submit', addBook);


function addBook(e){
   
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
    let uii = new UI();
    if(title == '' || author == '' || isbn == ''){
        uii.showAlert("Please fill al the fields!!", "error");
    }else{
        let book = new Book(title , author, isbn);
        // console.log(author);
        // console.log(book);
          
         
         uii.addToBooklist(book);
         uii.showAlert("Good Job for Add Book in Your Library !!", "success");

         uii.clear();
    }
    
   /* let book = new Book(title , author, isbn);
   // console.log(author);
   // console.log(book);
     
    let uii = new UI();
    uii.addToBooklist(book);

    uii.clear();*/
    
    e.preventDefault();
}