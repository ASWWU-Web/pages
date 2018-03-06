import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-scroll-cards',
  templateUrl: './page-scroll-cards.component.html',
  styleUrls: ['./page-scroll-cards.component.css']
})

export class PageScrollCardsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;
}
