import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MultiArticle } from 'src/app/_models/multi-article';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  @Input('selectedTag') selectedTag: string;
  tagFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.spinner.show();
    // console.log(changes);
    // console.log(changes.selectedTag.currentValue);
    this.getTagFeed(0, this.itemsPerPage);
  }

  getTagFeed(skip: number, top: number) {
    this.articleService
      .getTagFeed(this.selectedTag, skip, top)
      .subscribe((res: MultiArticle) => {
        this.spinner.hide();
        this.tagFeeds = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      });
  }

  handlePageChange(page: number) {
    this.spinner.show();
    this.getTagFeed(page, this.itemsPerPage);
  }
}
