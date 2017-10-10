export interface Customer {
    id:number;
    name: string;
    addresses: Address[];
}

export interface Address {
    id:number;
    bookname: string;
    postcode: string;
}