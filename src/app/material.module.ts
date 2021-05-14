import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
	declarations: [],
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
	],
	exports: [
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
	]
})
export class MaterialModule { }
