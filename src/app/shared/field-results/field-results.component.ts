import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'field-results',
  templateUrl: './field-results.component.html',
  styleUrls: ['./field-results.component.css']
})

export class FieldResultsComponent implements OnChanges {
  @Input() requestData: any;
  @Input() searchKey: string;
  @Input() sort: boolean = false;

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

  queryJson(item) {
    let json = {};
    json[this.searchKey] = item[this.searchKey];
    return json;
  }
}
