import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ThanksDialog} from "./components/dialog/thanksdialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitter-io';
  loggedIn = false;
  textToTweet = "";
  userProfile = false;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  ngOnInit(){
    this.http.get('/api/checkLogin', {withCredentials: true}).subscribe((data: any) => {
      this.loggedIn = !!data.user;
      if(this.loggedIn) {
        this.userProfile = data.user
      }
    })
  }

  logout(){
    this.http.get('/api/logout', {withCredentials: true}).subscribe(() => this.loggedIn = false)
  }

  showDialog(success : boolean) {
    this.dialog.open(ThanksDialog, {
      width: '350px',
      data: {success: success}
    })
  }

  createTweet(){
    this.http.post('/api/createTweet',
      {textToTweet: this.textToTweet},
      {withCredentials: true}).subscribe((data:any) => {
        if(data.message) {
          this.textToTweet = "";
          this.showDialog(true)
        }
    });
  }
}


