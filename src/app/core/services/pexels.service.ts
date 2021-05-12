import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PexelResponse } from '../models/pexel-response.model';

@Injectable({
	providedIn: 'root'
})
export class PexelsService {
	private baseUrl = 'https://api.pexels.com/v1/';

	constructor(private http: HttpClient) { }

	getPictures(query: string = 'people', page: number = 1, perPage: number = 10): Observable<PexelResponse> {
		return this.http.get<PexelResponse>(`${this.baseUrl}search?query=${query}&page=${page}&per_page=${perPage}`);
	}

}
