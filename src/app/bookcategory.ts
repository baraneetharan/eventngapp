import { Book } from "./book";

export class BookCategory {
    constructor(
        public id:number,
        public name: string,
        public book: Book[]){}
}