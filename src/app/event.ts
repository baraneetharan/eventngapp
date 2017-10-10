import { Agenda } from "./agenda";

export class Event {
    constructor(public eid:number,public name: string, public email:string,public agendas: Agenda){}
    
}
