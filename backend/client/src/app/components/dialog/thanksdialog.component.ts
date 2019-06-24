import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'thanksdialog',
  templateUrl: './thanksdialog.component.html',
})
export class ThanksDialog {
  constructor(
    public dialogRef: MatDialogRef<ThanksDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
