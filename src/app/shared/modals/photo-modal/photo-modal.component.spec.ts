import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

import { PhotoModalComponent } from './photo-modal.component';

describe('PhotoModalComponent', () => {
	let component: PhotoModalComponent;
	let fixture: ComponentFixture<PhotoModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule],
			declarations: [PhotoModalComponent],
			providers: [{
				provide: MatDialogRef,
				useValue: {}
			}, {
				provide: MAT_DIALOG_DATA,
				useValue: { incidentId: undefined } // Add any data you wish to test if it is passed/used correctly
			}]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PhotoModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
