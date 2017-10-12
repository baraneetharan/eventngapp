import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EventService } from "./event.service";
import { BookCategoryService } from "./bookcategory.service";
import { Book } from './book';
import { BookCategory } from './bookcategory';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public myForm: FormGroup;
    statusCode: number;
    allBookCategories: BookCategory[];
    books: Object = {};
    tobeupdated: string;
    
    constructor(private _fb: FormBuilder,
    private bookCategoryService: BookCategoryService) { }
    
    ngOnInit() {
    // this.adding = 0;
    
    this.myForm = this._fb.group({
    bookcatId: [0],
    name: ['', [Validators.required, Validators.minLength(5)]],
    book: this._fb.array([
    // this.initBook(),
    ])
    });
    this.getall();
    }
    
    loadform() {
    this.myForm = this._fb.group({
    bookcatId: [this.tobeupdated],
    name: ['', [Validators.required, Validators.minLength(5)]],
    book: this._fb.array([
    // this.initBook(),
    ])
    });
    }
    
    initBook() {
    return this._fb.group({
    bookId: [0],
    bookname: ['', Validators.required],
    });
    }
    
    addBook() {
    
    const control = <FormArray>this.myForm.controls['book'];
    console.log(this.initBook());
    control.push(this.initBook());
    }
    removeBook(i: number) {
    const control = <FormArray>this.myForm.controls['book'];
    control.removeAt(i);
    }
    
    update() {
    
    console.log(this.myForm.controls['book']);
    console.log("*******" + JSON.stringify(this.myForm.value));
    this.bookCategoryService.updateBookCategory(this.tobeupdated, this.myForm.value)
    .subscribe(successCode => {
    //this.statusCode = successCode;
    this.getall();
    },
    errorCode => this.statusCode = errorCode);
    
    }
    
    save() {
    console.log(this.myForm.value);
    this.bookCategoryService.addBookCategory(this.myForm.value)
    .subscribe(successCode => {
    //this.statusCode = successCode;
    
    },
    errorCode => this.statusCode = errorCode);
    this.getall();
    }
    
    getall() {
    this.bookCategoryService.getAllBookCategory()
    .subscribe(
    data => this.allBookCategories = data,
    errorCode => this.statusCode = errorCode);
    }
    
    deleteBookCategory(bookcatId: string) {
    this.bookCategoryService.deleteBookCategory(bookcatId)
    .subscribe(successCode => {
    // this.statusCode = successCode; 
    this.getall();
    },
    errorCode => this.statusCode = errorCode);
    }
    
    editBookCategory(bookcatId: string) {
    this.tobeupdated = bookcatId;
    this.bookCategoryService.getBookCategory(bookcatId)
    .subscribe(data => {
    this.books = data;
    this.patchForm();
    });
    
    }
    
    patchForm() {
    console.log("books------>>>>>" + JSON.stringify(this.books));
    
    this.loadform();
    this.myForm.patchValue({
    name: this.books['name'],
    })
    this.setBooks();
    }
    
    setBooks() {
    let control = <FormArray>this.myForm.controls['book'];
    this.books['book'].forEach(x => {
    control.push(this._fb.group({ bookId: x.bookId, bookname: x.bookname }));
    })
    
    }
    public clearArray() {
    this.myForm.controls['book'] = this._fb.array([]);
    }
}
