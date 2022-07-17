import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss'],
})
export class MyFeedComponent implements OnInit {
  myFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getMyFeed(0, this.itemsPerPage);
  }

  getMyFeed(skip: number, top: number) {
    this.articleService.getMyFeed(skip, top).subscribe(
      (res) => {
        this.spinner.hide();
        this.myFeeds = res.articles;
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
    this.getMyFeed(page, this.itemsPerPage);
  }
}
