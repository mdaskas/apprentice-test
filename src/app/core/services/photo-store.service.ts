import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PexelPhoto, PexelResponse } from '../models';
import { PexelsService } from './pexels.service';

@Injectable({
	providedIn: 'root'
})
export class PhotoStoreService {
	private pexelResponse: PexelResponse | null = null;

	private _photos = new BehaviorSubject<PexelPhoto[]>([]);
	photos$ = this._photos.asObservable();

	private _currentPage: number = 0;
	get currentPage(): number {
		return this._currentPage;
	}

	private _nextPage: string = '';
	get nextPage(): string {
		return this._nextPage;
	}

	private _prevPage: string = '';
	get prevPage(): string {
		return this._prevPage;
	}

	constructor(private pexelsService: PexelsService) { }

	getPhotos(query: string, page: number, perPage: number) {
		this.pexelsService
			.getPictures(query, page, perPage)
			.subscribe((res: PexelResponse) => this.storeResponse(res));
	}

	getPhotoPage(url: string) {
		this.pexelResponse?.next_page && this.pexelsService.getPicturesByUrl(url)
			.subscribe((res: PexelResponse) => this.storeResponse(res));
	}

	storeResponse(res: PexelResponse) {
		this.pexelResponse = res;
		this._currentPage = res.page;
		this._nextPage = res.next_page ?? '';
		this._prevPage = res.prev_page ?? '';
		this._photos.next(this.pexelResponse.photos);
	}
}
