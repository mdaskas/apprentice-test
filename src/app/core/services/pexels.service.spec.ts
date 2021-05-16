import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PexelsService } from './pexels.service';
import { MaterialModule } from 'src/app/material.module';

describe('PexelsService', () => {
	let service: PexelsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, MaterialModule]

		});
		service = TestBed.inject(PexelsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
