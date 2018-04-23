import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'field-scroll-cards',
  templateUrl: './field-scroll-cards.component.html',
  styleUrls: ['./field-scroll-cards.component.css']
})

export class FieldScrollCardsComponent implements OnChanges {
  @Input() requestData: any;
  @Input() searchKey: string;
  @Input() sort: boolean = false;
  uniqueID: string = Math.random().toString(36).substr(2, 9);

  ngOnChanges() {
    // sort data based on searchKey
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a[this.searchKey] < b[this.searchKey]) return -1;
        if(a[this.searchKey] > b[this.searchKey]) return 1;
        return 0;
      });
    }
  }

  scroll(negative) {
    // get card widths
    let cardWidth = 0
    try {
      cardWidth = document.getElementById('0-' + this.uniqueID).offsetWidth;
    } catch(err) {
      return
    }
    let scroller = document.getElementById('scrolling-wrapper-' + this.uniqueID)
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
