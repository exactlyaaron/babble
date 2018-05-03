import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class MiniArticle extends React.Component {
  render(){
    return (
      <div className={"article__wrapper mini "+this.props.customClass}>
        <div className="button__copy"></div>
        <div className="button__toggle-view expand"></div>
        <span className="article-title">{this.props.article.title}</span>
      </div>
    )
  }
}

export default MiniArticle;
