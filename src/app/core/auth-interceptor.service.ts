import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			setHeaders: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json',
				// 'Cache-Control': 'private',
				// 'Access-Control-Allow-Origin': '*',
				'Authorization': '563492ad6f91700001000001028874e4812b484f83604ff620b84439',
			},
		});

		return next.handle(req);
	}
}
