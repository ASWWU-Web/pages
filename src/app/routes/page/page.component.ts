import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.page = { 
        'url': "test",
        'title': "Title",
        'content': '<h1>test!</h1> <script>console.log("Hello there!");</script><a style="color:green;" href="https://google.com">the google</a>',
        'owner': "ryan.rabello",
        'editors': [{"username": "ryan.rabello"}, {"username": "stephen.ermshar"}],
        'is_visible': true,
        'created': "some valid date string",
        'tags': [{"tag": "cool"},{"tag": "blue"}],
        'category': "collegian",
        'department': "collegian",
        'current': true
      }; }, 1000);
  }

}
