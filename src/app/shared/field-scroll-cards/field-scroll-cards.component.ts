import { Component, Input } from '@angular/core';

@Component({
  selector: 'field-scroll-cards',
  templateUrl: './field-scroll-cards.component.html',
  styleUrls: ['./field-scroll-cards.component.css']
})

export class FieldScrollCardsComponent {
  @Input() requestData: any;
  @Input() searchKey: string;

  queryJson(item) {
    let json = {};
    json[this.searchKey] = item[this.searchKey];
    return json;
  }
}
