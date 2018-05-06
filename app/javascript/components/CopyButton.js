import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class CopyButton extends React.Component {
  onCopy = () => {
    this.setState({copied: true});
    // set counter for popularity
    let popularArticleList = JSON.parse(localStorage.getItem('popularArticles')) || []

    if(_.find(popularArticleList, {title: this.props.article.title})){
      let existingArticle = _.find(popularArticleList, {title: this.props.article.title});
      _.remove(popularArticleList, {
        title: this.props.article.title
      });
      popularArticleList.push({title: this.props.article.title, count: existingArticle.count + 1, article: existingArticle.article});
    } else {
      popularArticleList.push({title: this.props.article.title, count: 1, article: this.props.article});
    }

    if (popularArticleList.length > 10) {
      popularArticleList.shift();
    }

    // set history for previously clicked articles
    let previousArticleList = JSON.parse(localStorage.getItem('previousArticles')) || []
    if(!(_.find(previousArticleList, {title: this.props.article.title}))){
      previousArticleList.push(this.props.article);
    }

    if (previousArticleList.length > 10) {
      previousArticleList.shift();
    }


    localStorage.setItem('previousArticles', JSON.stringify(previousArticleList))
    localStorage.setItem('popularArticles', JSON.stringify(_.orderBy(popularArticleList, 'count', 'desc')))
    this.props.reRenderHome();
  };

  render(){
    return (
      <CopyToClipboard
        onCopy={this.onCopy}
        text={this.props.content}>
        <div className="button__copy"></div>
      </CopyToClipboard>
    )
  }
}

export default CopyButton;
