import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';

export interface ICustomHttpService {
	get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
}
