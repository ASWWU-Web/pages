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
  // scroller: number = 4;

  ngOnChanges() {
    // sort data based on title
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a['title'] < b['title']) return -1;
        if(a['title'] > b['title']) return 1;
        return 0;
      });
    }
  }

  scrollRight() {
    let cardWidth = document.getElementById('p0').offsetWidth * 2;
    console.log(cardWidth);
    document.getElementById('scrolling-wrapper').scrollBy({left: cardWidth, behavior: 'smooth'})
  }

  scrollLeft() {
    let cardWidth = document.getElementById('p0').offsetWidth * 2;
    console.log(cardWidth);
    document.getElementById('scrolling-wrapper').scrollBy({left: -cardWidth, behavior: 'smooth'})
  }
}
