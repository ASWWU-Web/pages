import { Component, Input } from '@angular/core';

@Component({
  selector: 'field-results',
  templateUrl: './field-results.component.html',
  styleUrls: ['./field-results.component.css']
})
export class FieldResultsComponent {
  @Input() requestData: any;
  @Input() searchKey: string;

  queryJson(item) {
    let json = {};
    json[this.searchKey] = item[this.searchKey];
    return json;
  }
}
