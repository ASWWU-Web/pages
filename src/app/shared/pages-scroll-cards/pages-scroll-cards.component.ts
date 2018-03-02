import { Component, Input } from '@angular/core';

@Component({
  selector: 'pages-scroll-cards',
  templateUrl: './pages-scroll-cards.component.html',
  styleUrls: ['./pages-scroll-cards.component.css']
})

export class PagesScrollCardsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;
}
