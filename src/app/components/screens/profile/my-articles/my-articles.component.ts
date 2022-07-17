import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { MultiArticle } from 'src/app/_models/multi-article';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent implements OnInit {
  @Input('selectedUser') selectedUser: string;
  myArticles: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnChanges(): void {
    // console.log('run: ', this.selectedUser);
    this.spinner.show();
    this.getMyArticles(this.selectedUser, 0, this.itemsPerPage);
  }

  ngOnInit(): void {}

  getMyArticles(username: string, skip: number, top: number) {
    this.articleService
      .getMyArticles(username, skip, top)
      .subscribe((res: MultiArticle) => {
        this.spinner.hide();
        this.myArticles = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      });
  }

  handlePageChange(page: number) {
    this.getMyArticles(this.selectedUser, page, this.itemsPerPage);
  }
}
