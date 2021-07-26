import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from 'src/app/services/data/profile-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // user: Users = new Users();
  onParentLoaded: boolean = false;
  constructor(private userService: ProfileDataService) { }

  ngOnInit() {
    // this.userService.getUserInfo().subscribe(response => {
    //     this.user = response;
    //     console.log(response);
    //     this.onParentLoaded = true;
    //   },
    //   error => { console.log(error) }
    // )
  }
}
