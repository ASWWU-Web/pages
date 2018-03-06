import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.css'],
})

export class PageResultsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;
}
