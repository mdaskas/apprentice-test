import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { PexelPhoto } from './core/models';
import { PhotoStoreService } from './core/services/photo-store.service';
import { PhotoModalComponent } from './shared/modals/photo-modal/photo-modal.component';

// TODO	 need to get current page, & perPage from service
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
	@ViewChild('scrollContent') scrollEl: ElementRef<HTMLDivElement>;

	search = '';
	photos$: Observable<PexelPhoto[]>;
	page = 1;
	perPage = 30;
	currentPage = 1;

	destroy$ = new Subject<any>();

	constructor(
		public photoStore: PhotoStoreService,
		private matDialog: MatDialog
	) {
		this.photos$ = this.photoStore.photos$;
	}

	ngAfterViewInit() {
		fromEvent(this.scrollEl.nativeElement, 'scroll').pipe(
			debounceTime(300),
			filter((e: any) => !!((e.target.scrollHeight - e.target.scrollTop) < (e.target.offsetHeight * 1.03))),
			filter(() => !!((this.currentPage === this.photoStore.currentPage) && this.photoStore.nextPage)),
			takeUntil(this.destroy$)
		).subscribe((e) => {
			this.onNext();
		});
	}

	onSearch() {
		this.photoStore.getPhotos(this.search, this.page, this.perPage);
	}

	onNext() {
		if (this.photoStore.nextPage) {
			this.currentPage += 1;
			this.photoStore.getPhotoPage(this.photoStore.nextPage);
		}
	}

	onPrev() {
		if (this.photoStore.prevPage) {
			this.currentPage -= 1;
			this.photoStore.getPhotoPage(this.photoStore.prevPage);
		}
	}

	onPhoto(photoUrl: string, photographer: string) {
		this.matDialog.open(PhotoModalComponent, { data: { photoUrl, photographer } });
	}

	ngOnDestroy() {
		this.destroy$.next();
	}

}
