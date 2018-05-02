import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

  toggleArticle = () => {
    this.setState({display: this.state.display == 'closed' ? 'opened' : 'closed'})
  }

  onCopy = () => {
    this.setState({copied: true});
  };

  conClick = ({target: {innerHTML}}) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  toggleModal = (e) => {
    this.setState({expanded: !this.state.expanded})
    this.props.toggleModal(e, this.props.article)
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
            {this.renderArticleContent('opened')}
        </div>
      )
    }
    return (null)
  }

  renderArticleContent = (displayOverride=undefined) => {
    return (
      <div className={"article__wrapper "+(displayOverride ? displayOverride : this.state.display)} onClick={this.articleClick}>
        <div className="article__controls">
          <CopyToClipboard
            onCopy={this.onCopy}
            text={this.props.article.contents && this.props.article.contents[0]}>
            <div onClick={this.onClick} className="button__copy"></div>
          </CopyToClipboard>
          <div className={"button__toggle-view "+(this.state.expanded ? "collapse":"expand")} onClick={(e) =>{this.toggleModal(e)}}></div>
          <div className="button__toggle-view open" onClick={this.toggleArticle}></div>
          <span className="article-title">{this.props.article.title}</span>
        </div>
        <div className="article__contents__wrapper">
          <div className="article__contents__items">
            {this.props.article.contents && this.props.article.contents.map((content, j) => {
              return(
                <div key={'content-'+j} className="article__content">
                  <CopyToClipboard
                    onCopy={this.onCopy}
                    text={content}>
                    <div onClick={this.onClick} className="button__copy"></div>
                  </CopyToClipboard>
                  <div className="article-content__text">{content}</div>
                </div>
              )
            })}
          </div>
          <div className="article__tags__wrapper tags__list">
            {this.props.article.tags && this.props.article.tags.map((tag, k) => {
              return(
                <span className="tag" key={'tag-'+k}><span>{tag}</span></span>
              )
            })}
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
