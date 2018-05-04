import React from 'react';
import _ from 'lodash';
import Article from './Article.js';
import MiniArticle from './MiniArticle.js'

class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        allArticlesDisplay: undefined,
        displayHeaderControls: false
      };
  }

  reRender = () => {
    this.forceUpdate();
  }

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

  renderPopularArticles = () => {
    let popularArticleList = localStorage.getItem('popularArticles') || '[]'
    return (
      <div className={`top-articles popular`}>
        <span className="top-articles__label">Popular Articles</span>
        <div className="top-articles__list">
          {
            JSON.parse(popularArticleList).map((article, i)=>{
              return (
                <MiniArticle
                  key={i}
                  article={article}
                  customClass={i == 0 ? 'first' : ''}
                />
              )
            })
          }
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
              <MiniArticle
                key={i}
                article={article}
              />
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
            allArticlesDisplay={this.state.allArticlesDisplay}
            reRenderHome={this.reRender}
          />
        )
      })
    )
  }

  expandAllArticles = () => {
    this.setState({allArticlesDisplay: 'opened'})
  }

  collapseAllArticles = () => {
    this.setState({allArticlesDisplay: 'closed'})
  }

  toggleHeaderControls = () => {
    this.setState({displayHeaderControls: !this.state.displayHeaderControls})
  }

  removeLocalStorageItem = (keyName) => {
    localStorage.removeItem(keyName);
    this.reRender();
  }

  render() {
    return (
      <div>
        <div className="top-area__wrapper">
          <div className="header__wrapper">
            <div className="logo"></div>
            <div className="header__controls__wrapper">
              <div className={"header__controls__toggle "+(this.state.displayHeaderControls ? 'opened' : '')} onClick={this.toggleHeaderControls}></div>
              <div className={"header__controls__panel "+(this.state.displayHeaderControls ? 'show' : '') }>
                <span className="header__controls__button" onClick={()=>{this.removeLocalStorageItem('previousArticles')}}>Clear Previous Articles</span>
                <span className="header__controls__button" onClick={()=>{this.removeLocalStorageItem('popularArticles')}}>Reset Popular Articles</span>
                <span className="header__controls__button">Save Browser History</span>
                <a className="header__controls__button" data-method="delete" href="/users/sign_out" rel="nofollow">Sign Out</a>
              </div>
            </div>
          </div>
          <div className="search__wrapper">
            <input type="text" placeholder="What do you want" />
          </div>
          {/*{this.renderPopularTags()}*/}

          <div className="top-articles__wrapper">
            {this.renderPopularArticles()}
          </div>
        </div>

        <div className="main-articles__wrapper">
          <div className="main-articles__controls">
            <span className="main-articles__control" onClick={this.expandAllArticles}>Expand All</span>
            <span className="main-articles__control" onClick={this.collapseAllArticles}>Collapse All</span>
          </div>

          {this.renderMainArticles(this.props.data && this.props.data.articles)}

        </div>
        <p>Hello, I am {this.props.name}!</p>
      </div>
    )
  }
}

export default Home;
