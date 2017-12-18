import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss']
})
export class FacadeComponent implements OnInit {
  @select(['core', 'appUser', 'name'])
  appUserName$: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

}
