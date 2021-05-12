import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PexelsService } from '.';
import { PexelPhoto, PexelResponse } from '../models';

@Injectable({
	providedIn: 'root'
})
export class PhotoStoreService {
	private response: PexelResponse | null = null;

	private _photos = new BehaviorSubject<PexelPhoto[]>([]);
	photos$ = this._photos.asObservable();

	constructor(private pexelsService: PexelsService) { }

	getPhotos(query: string, page: number, perPage: number) {
		this.pexelsService
			.getPictures(query, page, perPage)
			.subscribe((res: PexelResponse) => {
				this.response = res;
				this._photos.next(this.response.photos);
			});
	}

}
