import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [],
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule
	],
	exports: [
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule
	]
})
export class MaterialModule { }
