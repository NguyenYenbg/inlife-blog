import { MultiArticle } from './../_models/multi-article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleArticle } from '../_models/single-article';
import { Tag } from '../_models/tag';
import { Profile } from '../_models/profile';
import { SingleComment } from '../_models/single-comment';
import { config } from '../config';
import { MultiComment } from '../_models/multi-comment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  // Home Screen
  getMyFeed(skip: number, top: number): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + `/articles/feed?limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  getGlobalFeed(skip: number, top: number): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + `/articles?limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  getTag(): Observable<Tag> {
    return this.http.get(config.apiUrl + '/tags') as Observable<Tag>;
  }

  getTagFeed(tag: string, skip: number, top: number): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + '/articles?tag=' + tag + `&limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  // Article Details
  getArticleDetail(slug: string): Observable<any> {
    return this.http.get(
      config.apiUrl + `/articles/` + slug
    ) as Observable<any>;
  }

  deteleArticle(slug): Observable<SingleArticle> {
    return this.http.delete(
      config.apiUrl + `/articles/${slug}`
    ) as Observable<SingleArticle>;
  }

  editArticle(updatedBody: any, slug: string): Observable<any> {
    return this.http.put(config.apiUrl + `/articles/${slug}`, {
      article: {
        title: updatedBody.title,
        description: updatedBody.description,
        body: updatedBody.body,
        tagList: updatedBody?.tagList ? updatedBody.tagList.split(', ') : [],
      },
    }) as Observable<any>;
  }

  // Add/Edit Article
  publishArticle(formValue: any) {
    return this.http.post(config.apiUrl + `/articles`, {
      article: {
        title: formValue.title,
        description: formValue.description,
        body: formValue.body,
        tagList: formValue?.tagList ? formValue.tagList.split(', ') : [],
      },
    });
  }

  // Interact with users/articles
  followUser(userName): Observable<Profile> {
    return this.http.post(config.apiUrl + `/profiles/${userName}/follow`, {
      user: {},
    }) as Observable<Profile>;
  }

  unFollowUser(userName): Observable<Profile> {
    return this.http.delete(
      config.apiUrl + `/profiles/${userName}/follow`
    ) as Observable<Profile>;
  }

  favoriteArticle(slug): Observable<SingleArticle> {
    return this.http.post(
      config.apiUrl + `/articles/${slug}/favorite`,
      ''
    ) as Observable<SingleArticle>;
  }

  unFavoriteArticle(slug): Observable<SingleArticle> {
    return this.http.delete(
      config.apiUrl + `/articles/${slug}/favorite`
    ) as Observable<SingleArticle>;
  }

  // Comments
  getComments(slug: string): Observable<MultiComment> {
    return this.http.get(
      config.apiUrl + `/articles/${slug}/comments`
    ) as Observable<MultiComment>;
  }

  addComments(bodyComment: any, slug: string): Observable<SingleComment> {
    return this.http.post(
      config.apiUrl + `/articles/${slug}/comments`,
      bodyComment
    ) as Observable<SingleComment>;
  }

  deteleComment(slug, id) {
    return this.http.delete(
      config.apiUrl + `/articles/${slug}/comments/${id}`
    ) as Observable<SingleComment>;
  }

  // Profile Screen
  getMyArticles(
    username: string,
    skip: number,
    top: number
  ): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl +
        `/articles?author=${username}` +
        `&limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  getFavoriteArticles(
    username: string,
    skip: number,
    top: number
  ): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl +
        `/articles?favorited=${username}` +
        `&limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }
}
