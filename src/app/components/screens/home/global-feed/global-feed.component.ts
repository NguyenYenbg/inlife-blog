import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  @Output('tagFromFeed') selectedTag = new EventEmitter();
  globalFeeds: any = [];
  filteredFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getGlobalFeed(0, this.itemsPerPage);
  }

  getGlobalFeed(skip: number, top: number) {
    this.articleService.getGlobalFeed(skip, top).subscribe(
      (res) => {
        this.spinner.hide();
        this.filteredFeeds = this.globalFeeds = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  handlePageChange(page: number) {
    this.spinner.show();
    this.getGlobalFeed(page, this.itemsPerPage);
  }

  getTagFromCard(tagName: string) {
    this.selectedTag.emit(tagName);
  }

  onKeyUp(value: string) {
    value = value.trim().toLowerCase();
    this.filteredFeeds = this.globalFeeds.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
  }
}
