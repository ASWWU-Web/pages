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
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a['title'] < b['title']) return -1;
        if(a['title'] > b['title']) return 1;
        return 0;
      });
    }
  }

  scroll(negative) {
    try {
      let cardWidth = document.getElementById('p0').offsetWidth;
    } catch(err) {
      return
    }
    let scroller = document.getElementById('scrolling-wrapper')
    let scrollVal = 0
    // jump to assumed card
    if (scroller.scrollLeft % cardWidth < cardWidth / 2) {
      scrollVal = cardWidth * 2 - (scroller.scrollLeft % cardWidth);
    } else {
      scrollVal = cardWidth * 3 - (scroller.scrollLeft % cardWidth);
    }
    // scroll opposite direction
    if (negative) {
      scrollVal = -scrollVal
    }
    scroller.scrollBy({left: scrollVal, behavior: 'smooth'})
  }
}
