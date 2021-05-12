import { Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import { PexelPhoto, PexelResponse } from './core/models';
import { PhotoStoreService } from './core/services';

// TODO	 need to get current page, & perPage from service
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	search = '';
	picSize = "small"
	title = 'apprentic-test';
	photos$: Observable<PexelPhoto[]>;
	page = 1;
	perPage = 10;
	constructor(
		public photoStore: PhotoStoreService
	) {
		this.photos$ = this.photoStore.photos$
	}

	getYPosition(e: Event): number {
		return (e.target as any).scrollingElement.scrollTop;
	}

	onSearch() {
		this.photoStore.getPhotos(this.search, this.page, this.perPage);
	}

	onNext() {
		this.page += 1;
		this.photoStore.getPhotos(this.search, this.page, this.perPage);
	}

	onPrev() {
		if (this.page > 1) {
			this.page -= 1;
			this.photoStore.getPhotos(this.search, this.page, this.perPage);
		}
	}

	@HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
		let pos = (document.documentElement.scrollTop || document.body.scrollTop); // + document.documentElement.offsetHeight;
		let max = document.documentElement.scrollHeight;

		console.log(this.getYPosition(e));
	}

	ngOnDestroy(): void {
		// this.destroy.next();
	}
}
