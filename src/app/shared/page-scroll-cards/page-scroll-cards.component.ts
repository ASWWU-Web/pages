import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'page-scroll-cards',
  templateUrl: './page-scroll-cards.component.html',
  styleUrls: ['./page-scroll-cards.component.css']
})

export class PageScrollCardsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;
  @Input() sort: boolean = false;

  ngOnChanges() {
    // sort data based on title
    if (this.requestData.length > 0 && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a['title'] < b['title']) return -1;
        if(a['title'] > b['title']) return 1;
        return 0;
      });
    }
  }
}
