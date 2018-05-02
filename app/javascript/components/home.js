import React from 'react';
import _ from 'lodash';
import Article from './Article.js';

class Home extends React.Component {
  
  renderPopularTags = () => {
    return (
      <div className="populartags__wrapper">
        <span className="popular-tags__label">Popular Tags</span>
        <div className="popular-tags__tags tags__list">
          <span className="tag"><span>Apple</span></span>
          <span className="tag"><span>Android</span></span>
          <span className="tag"><span>Things</span></span>
          <span className="tag"><span>Windows</span></span>
        </div>
      </div>
    )
  }

  renderTopArticles = (type) => {
    return (
      <div className={`top-articles ${type}`}>
        <span className="top-articles__label">{type.charAt(0).toUpperCase()+type.substr(1)} Articles</span>
        <div className="top-articles__list">
          {this.renderMiniArticles(type)}
        </div>
      </div>
    )
  }

  renderMiniArticles = (type) => {
    if(type == 'favorite'){
      let articles = _.filter(this.props.data.articles, function(obj) { return obj[type] == true; });
      return (
        <div>
          {articles.map((article, i) => {
            return (
              <div className="article__wrapper mini" key={i}>
                <div className="button__copy"></div>
                <div className="button__toggle-view expand"></div>
                <span className="article-title">{article.title}</span>
              </div>
            )
          })}
        </div>
      )
    }
  }

  renderMainArticles = (articles) => {
    return (
      articles.map((article, i) => {
        return (
          <Article
            key={i}
            article={article}
            toggleModal={this.toggleModal}
          />
        )
      })
    )
  }

  render() {
    return (
      <div>
        <div className="top-area__wrapper">
          <div className="header__wrapper">
            <div className="logo"></div>
            <div className="header__controls">
              <a data-method="delete" href="/users/sign_out" rel="nofollow">SIGN OUT</a>
            </div>
          </div>
          <div className="search__wrapper">
            <input type="text" placeholder="What do you want" />
          </div>
          {/*{this.renderPopularTags()}*/}

          <div className="top-articles__wrapper">
            {this.renderTopArticles('favorite')}
            {this.renderTopArticles('popular')}
          </div>
        </div>

        <div className="main-articles__wrapper">
          <div className="main-articles__controls">
            <span className="main-articles__control">Expand All</span>
            <span className="main-articles__control">Collapse All</span>
          </div>

          {this.renderMainArticles(this.props.data && this.props.data.articles)}

        </div>
        <p>Hello, I am {this.props.name}!</p>
      </div>
    )
  }
}

export default Home;
