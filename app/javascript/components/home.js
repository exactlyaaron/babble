import React from 'react';
import _ from 'lodash';
import Article from './Article.js';
import MiniArticle from './MiniArticle.js'

class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        allArticlesDisplay: undefined,
        displayHeaderControls: false,
        searchText: '',
        searchArticleList: [],
        searchType: 'title',
        activeTag: ''
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
                  reRenderHome={this.reRender}
                  copyContent={article.article && article.article.contents && article.article.contents[0]}
                />
              )
            })
          }
        </div>
      </div>
    )
  }

  renderArticleList = (articles) => {
    return (
      articles.map((article, i) => {
        return (
          <Article
            key={i}
            article={article}
            toggleModal={this.toggleModal}
            allArticlesDisplay={this.state.allArticlesDisplay}
            reRenderHome={this.reRender}
            clearSearch={this.clearSearch}
            setActiveTag={this.setActiveTag}
            allArticles={this.props.data.articles}
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

  onSearchChange = (e) => {
    if(this.state.searchText != e.target.value){
      this.setState({searchText: e.target.value})
    }
  }

  renderTopAreaContent = () => {
    if(this.state.searchText == ''){
      return (
        <div>
          <div className="top-articles__wrapper">
            {this.renderPopularArticles()}
          </div>
        </div>
      )
    } else {
      let titleResults = _.filter(this.props.data.articles, (o) => {
        if (o.title.toLowerCase().includes(this.state.searchText.toLowerCase())) {
          return o;
        }
      }) || [];
      let tagsResults = _.filter(this.props.data.articles, (o) => {
        if (o.tags.join().toLowerCase().includes(this.state.searchText.toLowerCase())) {
          return o;
        }
      }) || [];
      let contentsResults = _.filter(this.props.data.articles, (o) => {
        if (o.contents.join().toLowerCase().includes(this.state.searchText.toLowerCase())) {
          return o;
        }
      }) || [];
      let searchArticleList = [];
      if(this.state.searchType != ''){
        let results;
        switch (this.state.searchType) {
          case 'title':
            results = titleResults;
            break;
          case 'tags':
            results = tagsResults;
            break;
          case 'contents':
            results = contentsResults;
            break;
          default:
            alert('bad search type in state dangit')
        }
        searchArticleList = _.uniq(results)
      } else {
        searchArticleList = _.uniq([...titleResults, ...tagsResults, ...contentsResults])
      }
      return (
        <div>
          {this.renderSearchResults(searchArticleList)}
        </div>
      )
    }
  }

  renderSearchResults = (list) => {
    if(list.length > 0){
      return (
        <div>
          <p className="search-results__label">Search Results:</p>
          <div className="search-results__buttons">
            <span className={"search-results__button "+(this.state.searchType == '' ? 'filter-button-active' : '')} onClick={()=>{this.filterSearchResults('')}}>All Results</span>
            <span className={"search-results__button "+(this.state.searchType == 'title' ? 'filter-button-active' : '')} onClick={()=>{this.filterSearchResults('title')}}>By Title</span>
            <span className={"search-results__button "+(this.state.searchType == 'tags' ? 'filter-button-active' : '')} onClick={()=>{this.filterSearchResults('tags')}}>By Tags</span>
            <span className={"search-results__button "+(this.state.searchType == 'contents' ? 'filter-button-active' : '')} onClick={()=>{this.filterSearchResults('contents')}}>By Content</span>
          </div>
          {this.renderArticleList(list)}
        </div>
      )
    } else {
      return (
        <p className="search-results__label">'No Results Foo'</p>
      )
    }
  }

  clearSearch = () => {
    this.setState({searchText: ''});
    this.inputTextArea.value = "";
  }

  filterSearchResults = (type) => {
    this.setState({searchType: type})
  }

  renderTagHeadline = () => {
    if(this.state.activeTag != ''){
      return (
        <div className="active-tag__wrapper">
          <span className="active-tag__label">ACTIVE TAG: </span>
          <span className="active-tag__name">{this.state.activeTag}</span>
          <span className="active-tag__clear" onClick={()=>{this.setActiveTag('')}}>Clear</span>
        </div>
      )
    } else {
      return null;
    }
  }

  setActiveTag = (tag) => {
    this.setState({activeTag: tag})
  }

  renderMainArticles = () => {
    if(this.state.activeTag != ''){
      let tagsResults = _.filter(this.props.data.articles, (o) => {
        if (o.tags.includes(this.state.activeTag)) {
          return o;
        }
      }) || [];
      return (
        <div>
          {this.renderArticleList(tagsResults)}
        </div>
      )
    } else {
      return (
        <div>
          {this.renderArticleList(this.props.data && this.props.data.articles)}
        </div>
      )
    }
  }

  saveHistory = () => {
    let historyObj = {
      previousArticles: localStorage.getItem('previousArticles') || '[]',
      popularArticles: localStorage.getItem('popularArticles') || '[]'
    }
    fetch('/save_history', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        historyObj: historyObj
      })
    })
  }

  getCSRFToken() {
    return _.find(document.getElementsByTagName('meta'), (meta) => {
      return meta.name === 'csrf-token'
    }).content
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
                <span className="header__controls__button" onClick={this.saveHistory}>Save Browser History</span>
                <a className="header__controls__button" data-method="delete" href="/users/sign_out" rel="nofollow">Sign Out</a>
              </div>
            </div>
          </div>
          <div className="top-area__content">
            <div className="search__wrapper">
              <input
                type="text"
                placeholder="What do you want"
                onChange={(e)=>{this.onSearchChange(e)}}
                ref={el => this.inputTextArea = el}
              />
            <div className={"search__icon "+(this.state.searchText == '' ? '' : 'search-active')} onClick={this.clearSearch}></div>
            </div>
            {this.renderTopAreaContent()}
          </div>
        </div>

        <div className="main-articles__wrapper">
          <div className="main-articles__controls">
            <span className="main-articles__control" onClick={this.expandAllArticles}>Expand All</span>
            <span className="main-articles__control" onClick={this.collapseAllArticles}>Collapse All</span>
            {this.renderTagHeadline()}
          </div>

          {this.renderMainArticles()}

        </div>
        <p>Hello, I am {this.props.name}!</p>
      </div>
    )
  }
}

export default Home;
