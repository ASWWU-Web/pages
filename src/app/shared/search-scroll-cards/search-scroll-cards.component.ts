import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-scroll-cards',
  templateUrl: './search-scroll-cards.component.html',
  styleUrls: ['./search-scroll-cards.component.css']
})

export class SearchScrollCardsComponent {
  @Input() requestData: any;
  @Input() searchKey: string;
}
