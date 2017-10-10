import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class BookCategoryService {
    bookUrl = "http://localhost:8080/api/BookCategorys/";
  constructor( private http:Http) { }
  getAllBookCategory(){
    return this.http.get(this.bookUrl+"get")
        .map(res => res.json());
  }
   addBookCategory(info){
    return this.http.post(this.bookUrl+"post",info)
        .map(res => res.json());
  }
  getBookCategory(id){
    return this.http.get(this.bookUrl+"get/"+id)
        .map(res => res.json());
  }
  deleteBookCategory(id){
    return this.http.delete(this.bookUrl+"delete/"+id)
        //.map(res => res.json());
  }
  updateBookCategory(id, info){
    return this.http.put(this.bookUrl+"post/"+id,info)
        .map(res => res.json());
  }
}