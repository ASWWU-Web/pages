import { Component, Input } from '@angular/core';

@Component({
  selector: 'pages-scroll-cards',
  templateUrl: './pages-scroll-cards.component.html',
  styleUrls: ['./pages-scroll-cards.component.css']
})

export class PagesScrollCardsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;

  getAuthor(page) {
    let author = page['author'].replace(/\./gi, ' ');
    // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
    return author.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  getDateCreated(page) {
    let date = new Date(page['created']);
    return date.toLocaleString().replace(/,.*/, '');
  }
}
