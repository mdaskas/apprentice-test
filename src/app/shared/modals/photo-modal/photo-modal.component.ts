import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-photo-modal',
	templateUrl: './photo-modal.component.html',
	styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<PhotoModalComponent>
	) { }


	closeDialog() {
		this.dialogRef.close('Done!');
	}

	// https://stackblitz.com/edit/angular-mqbsjt
	toDataURL(url: any) {
		return fetch(url)
			.then(response => {
				return response.blob();
			})
			.then(blob => {
				return URL.createObjectURL(blob);
			});
	}

	async onDownload(event: any) {
		const a = document.createElement("a");
		a.href = await this.toDataURL(this.data.photoUrl);
		a.download = "test.jpg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

}
