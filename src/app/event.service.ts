import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map' ;
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {

  constructor( private http:Http) { }
   
//   getEvents(){
//     return this.http.get("http://localhost:8080/api/events/get")
//         .map(res => res.json());
//         }
        
        getEvents(): Observable<Event[]> {
            return this.http.get("http://localhost:8080/api/events/get")
               .map(this.extractData)
               .catch(this.handleError);
    
        }

//Create article
createArticle(event: Event):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post("http://localhost:8080/api/events/post", event, options)
               .map(success => success.status)
               .catch(this.handleError);
    }        

   

  private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
  
}