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
    bookCategoryEditForm: FormGroup;

    constructor(private _fb: FormBuilder,
        private bookCategoryService: BookCategoryService) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            id: [0],
            name: ['', [Validators.required, Validators.minLength(5)]],
            book: this._fb.array([
                // this.initBook(),
            ])
        });

        this.getall();
    }

    initBook() {
        return this._fb.group({
            id: [0],
            bookname: ['', Validators.required]
        });
    }

    addBook() {
        const control = <FormArray>this.myForm.controls['book'];
        control.push(this.initBook());
    }

    removeBook(i: number) {
        const control = <FormArray>this.myForm.controls['book'];
        control.removeAt(i);
    }

    save() {
        console.log(this.myForm.value);
        this.bookCategoryService.addBookCategory(this.myForm.value)
            .subscribe(successCode => {
                this.statusCode = successCode;
            },
            errorCode => this.statusCode = errorCode);
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
            },
            errorCode => this.statusCode = errorCode);
    }

    editBookCategory(bookcatId: string) {
        this.bookCategoryService.getBookCategory(bookcatId)
            .subscribe(data => {
                this.books = data;
                this.patchForm();
            })
    }

    patchForm() {
        this.myForm.patchValue({
            name: this.books['name'],
        })
        this.setBooks()
    }

    setBooks() {
        this.clearArray();
        let control = <FormArray>this.myForm.controls['book'];
        console.log("books------>>>>>" + this.books);

        this.books['book'].forEach(x => {
            console.log(x.bookname);
            control.push(this._fb.group({ bookname: x.bookname }))
        })
    }

    public clearArray() {
        this.myForm.controls['book'] = this._fb.array([]);
    }

}
