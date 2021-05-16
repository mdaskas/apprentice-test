import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PhotoStoreService } from './photo-store.service';
import { PexelsService } from './pexels.service';
import { MaterialModule } from 'src/app/material.module';

describe('PhotoStoreService', () => {
	let service: PhotoStoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, MaterialModule],
			providers: [PexelsService]
		});
		service = TestBed.inject(PhotoStoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
