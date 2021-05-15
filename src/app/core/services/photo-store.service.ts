import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PexelPhoto, PexelResponse } from '../models';
import { PexelsService } from './pexels.service';

@Injectable({
	providedIn: 'root'
})
export class PhotoStoreService {
	private readonly perPage = 30;
	private readonly maxStoreEntries = 50;
	private readonly baseUrl = 'https://api.pexels.com/v1/';

	// This will be our store of PexelResponses.
	private pexelStore: { [url: string]: PexelResponse } = {};

	private currentSearch: string = '';

	private _photos = new BehaviorSubject<PexelPhoto[]>([]);
	photos$ = this._photos.asObservable();

	private currentUrl: string = '';
	get hasNextPage(): boolean {
		return !!(this.currentUrl && !!this.pexelStore[this.currentUrl].next_page);
	}
	get hasPrevPage(): boolean {
		return !!(this.currentUrl && !!this.pexelStore[this.currentUrl].prev_page);
	}

	constructor(private pexelsService: PexelsService) { }

	getFirstPageWithQuery(query: string) {
		query !== this.currentSearch && (this.pexelStore = {});
		this.currentUrl = `${this.baseUrl}search?query=${query}&page=1&per_page=${this.perPage}`;

		this.pexelsService
			.getPicturesByUrl(this.currentUrl)
			.subscribe((res: PexelResponse) => this.storeResponse(res));
	}

	getNextPage() {
		this.hasNextPage && this.getPhotoPage(this.pexelStore[this.currentUrl].next_page as string);
	}

	getPrevPage() {
		this.hasPrevPage && this.getPhotoPage(this.pexelStore[this.currentUrl].prev_page as string);
	}

	private getPhotoPage(url: string) {
		if (this.pexelStore[url]) {
			this.currentUrl = url;
			this.storeResponse(this.pexelStore[url]);
		} else if (this.pexelStore[this.currentUrl]?.next_page) {
			this.currentUrl = url;
			this.pexelsService.getPicturesByUrl(url)
				.subscribe((res: PexelResponse) => this.storeResponse(res));
		}
	}

	private storeResponse(res: PexelResponse) {
		// Very Simple caching - only keep 50 entries - better approach would be to use timestamp and
		// replace the oldest entry with the new one.
		const x = Object.keys(this.pexelStore);
		(x.length > this.maxStoreEntries) && (delete this.pexelStore[x[0]]);

		this.pexelStore[this.currentUrl] = res;
		this._photos.next(res.photos);

		console.log(this.pexelStore);
	}
}
