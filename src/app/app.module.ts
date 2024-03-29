import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth.interceptor';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ParticlesModule } from 'angular-particle';
import { HomeComponent } from './components/screens/home/home.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { NewArticleComponent } from './components/screens/new-article/new-article.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { MyFeedComponent } from './components/screens/home/my-feed/my-feed.component';
import { GlobalFeedComponent } from './components/screens/home/global-feed/global-feed.component';
import { ArticleCardComponent } from './components/commons/article-card/article-card.component';
import { TagFeedComponent } from './components/screens/home/tag-feed/tag-feed.component';
import { MyArticlesComponent } from './components/screens/profile/my-articles/my-articles.component';
import { FavoriteArticlesComponent } from './components/screens/profile/favorite-articles/favorite-articles.component';
import { AboutUsComponent } from './components/screens/about-us/about-us.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { SummaryPipe } from './services/summary.pipe';
import { EditArticleComponent } from './components/screens/edit-article/edit-article.component';
import { ChangelogComponent } from './components/screens/changelog/changelog.component';
import { ParticleComponent } from './components/commons/particle/particle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    SignUpComponent,
    LoginComponent,
    NavBarComponent,
    PaginationComponent,
    FooterComponent,
    NewArticleComponent,
    NotFoundComponent,
    ArticleDetailComponent,
    MyFeedComponent,
    GlobalFeedComponent,
    ArticleCardComponent,
    TagFeedComponent,
    MyArticlesComponent,
    FavoriteArticlesComponent,
    SummaryPipe,
    AboutUsComponent,
    EditArticleComponent,
    ChangelogComponent,
    ParticleComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ParticlesModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
