import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap, throttleTime } from 'rxjs/operators';

import { PexelPhoto } from './core/models';
import { PhotoStoreService } from './core/services/photo-store.service';
import { PhotoModalComponent } from './shared/modals/photo-modal/photo-modal.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
	@ViewChild('scrollContent') scrollEl: ElementRef<HTMLDivElement>;
	@ViewChild('searchInputEl') searchInputEl: ElementRef<HTMLDivElement>;

	search = '';
	photos$: Observable<PexelPhoto[]>;
	page = 1;

	destroy$ = new Subject<any>();

	constructor(
		public photoStore: PhotoStoreService,
		private matDialog: MatDialog
	) {
		this.photos$ = this.photoStore.photos$;
	}

	ngAfterViewInit() {
		fromEvent(this.searchInputEl.nativeElement, 'keyup')
			.pipe(
				map((e: any) => e?.target?.value),
				filter(searchText => searchText && searchText.length > 2),
				debounceTime(300),
				distinctUntilChanged(),
				takeUntil(this.destroy$)
			).subscribe((searchText: string) => this.photoStore.getFirstPageWithQuery(searchText));

		fromEvent(this.scrollEl.nativeElement, 'scroll')
			.pipe(
				debounceTime(300),
				filter((e: any) => !!((e.target.scrollHeight - e.target.scrollTop) < (e.target.offsetHeight * 1.03))),
				filter(() => this.photoStore.hasNextPage),
				throttleTime(1000),
				takeUntil(this.destroy$)
			).subscribe((e) => {
				this.onNext();
			});
	}

	onNext() {
		if (this.photoStore.hasNextPage) {
			this.photoStore.getNextPage();
		}
	}

	onPrev() {
		if (this.photoStore.hasPrevPage) {
			this.photoStore.getPrevPage();
		}
	}

	onPhoto(photoUrl: string, photographer: string) {
		this.matDialog.open(PhotoModalComponent, { data: { photoUrl, photographer } });
	}

	ngOnDestroy() {
		this.destroy$.next();
	}

}
