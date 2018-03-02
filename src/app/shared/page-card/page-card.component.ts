import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.css']
})

export class PageCardComponent {
  @Input() page: any;
  @Input() showMeta: boolean;

  getAuthor(page) {
    try {
      let author = page['author'].replace(/\./gi, ' ');
        // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
        return author.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    } catch(err) {
      return "";
    }
  }

  getDateCreated(page) {
    let date = new Date(page['created']);
    return date.toLocaleString().replace(/,.*/, '');
  }
}
