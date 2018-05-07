import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import _ from 'lodash';
import MiniArticle from './MiniArticle.js'
import CopyButton from './CopyButton.js'

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        display: this.props.defaultDisplay || 'closed',
        value: 'i am a test',
        copied: false,
        expanded: this.props.expanded || false,
        displayModal: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if( nextProps.allArticlesDisplay && (this.state.display != nextProps.allArticlesDisplay) ){
      this.setState({display: nextProps.allArticlesDisplay})
    }
  }

  toggleArticle = () => {
    this.setState({display: this.state.display == 'closed' ? 'opened' : 'closed'})
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded, displayModal: !this.state.displayModal})
  }

  renderArticleModal = () => {
    if(this.state.displayModal){
      return (
        <div className="article-modal__wrapper" onClick={this.toggleModal}>
          <div className="article-modal__close" onClick={this.toggleModal}></div>
            {this.renderArticleContent('opened', true)}
        </div>
      )
    }
    return (null)
  }

  renderPreviousArticles = () => {
    let previousArticleList = localStorage.getItem('previousArticles') || '[]'
    return JSON.parse(previousArticleList).map((article, i)=>{
      return (
        <MiniArticle
          key={i}
          article={article}
          customClass={i == 0 ? 'first' : ''}
          copyContent={article.contents && article.contents[0]}
          reRenderHome={this.props.reRenderHome}
        />
      )
    })
  }

  onTagClick = (e, tag) => {
    this.props.clearSearch();
    this.props.setActiveTag(tag);
    this.toggleModal(e);
  }

  renderRelatedArticles = () => {
    // loop over tags
    // find articles with each tag
    // count occurences of each
    // sort by count
    // render mini articles
    let relatedArticleList = [];
    let tagResultList = this.props.article.tags.map((tag)=>{
      return _.filter(this.props.allArticles, (o) => {
        if ((this.props.article.title != o.title) && o.tags.includes(tag)) {
          return o;
        }
      }) || [];
    });

    let countRelated = this.arrayByFreq(_.flatten(tagResultList));
    return countRelated.map((article, i)=>{
      return (
        <MiniArticle
          key={i}
          article={article.obj}
          customClass={i == 0 ? 'first' : ''}
          copyContent={article.obj.contents && article.obj.contents[0]}
          reRenderHome={this.props.reRenderHome}
        />
      )
    });
  }

  arrayByFreq = (array) => {
    let countz = []
    _.uniq(array).map((article)=>{
      var numberOfTitle = 0;
      for(var i = 0; i < array.length; i++){
        if(array[i].title == article.title){
          numberOfTitle++;
        }
      }
      countz.push({
        occ: numberOfTitle,
        obj: article
      })
    });
    return _.filter(countz, 'occ', 'desc');
  };

  renderArticleContent = (displayOverride=undefined, modal=undefined) => {
    let displayClass = displayOverride ? displayOverride : this.state.display;
    return (
      <div className={"article__wrapper "+(displayClass)} onClick={this.articleClick}>
        <div className="article__controls">
          <CopyButton
            {...this.props}
            content={this.props.article.contents[0]}
          />
          <div className={"button__toggle-view "+(this.state.expanded ? "collapse":"expand")} onClick={(e) =>{this.toggleModal(e)}}></div>
          {!modal &&
            <div className="button__toggle-view open" onClick={this.toggleArticle}></div>
          }
          <span className="article-title">{this.props.article.title}</span>
        </div>
        <div className="article__contents__wrapper">
          <div className="article__contents__items">
            {this.props.article.contents && this.props.article.contents.map((content, j) => {
              return(
                <div key={'content-'+j} className="article__content">
                  <CopyButton
                    {...this.props}
                    content={content}
                  />
                  <div className="article-content__text">{content}</div>
                </div>
              )
            })}
          </div>
          <div className="article__tags__wrapper tags__list">
            {this.props.article.tags && this.props.article.tags.map((tag, k) => {
              return(
                <span className="tag" key={'tag-'+k} onClick={(e)=>{this.onTagClick(e, tag)}}><span>{tag}</span></span>
              )
            })}
          </div>
          <div className="article__related-and-previous__wrapper">
            <div className="article__minilist__wrapper">
              <div className="article__minilist__title">Related Articles:</div>
              {this.renderRelatedArticles()}
            </div>
            <div className="article__minilist__wrapper">
              <div className="article__minilist__title">Previous Articles:</div>
              {this.renderPreviousArticles()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  articleClick = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <div>
        {this.renderArticleContent()}
        {this.renderArticleModal()}
      </div>
    )
  }
}

export default Article;
