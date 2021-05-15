import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PexelResponse } from '../models/pexel-response.model';

@Injectable({
	providedIn: 'root'
})
export class PexelsService {
	private baseUrl = 'https://api.pexels.com/v1/';

	constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

	getPicturesByUrl(url: string): Observable<PexelResponse | any> {
		return this.http.get<PexelResponse>(url)
			.pipe(
				retry(1),
				catchError(err => {
					this.snackBar.open(err.message, 'Close', { duration: 3000 });
					return of(err.message);
				})
			);
	}
}
