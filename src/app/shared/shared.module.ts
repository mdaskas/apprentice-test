import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoModalComponent } from './modals/photo-modal/photo-modal.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		PhotoModalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		MaterialModule,

		PhotoModalComponent,
	]
})
export class SharedModule { }
