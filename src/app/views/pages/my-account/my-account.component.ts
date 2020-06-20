import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../../../core/services/utility.service';
import {User} from '../../../core/models/user/user.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public loggedInUser = UtilityService.UserProfile ? new User(UtilityService.UserProfile) : new User('');

  constructor() { }

  ngOnInit() {
  }

}
