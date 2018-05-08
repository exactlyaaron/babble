import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopyButton from './CopyButton.js'

class MiniArticle extends React.Component {
  render(){
    return (
      <div className={"article__wrapper mini "+this.props.customClass}>
        <CopyButton
          {...this.props}
          content={this.props.copyContent || (this.props.article.contents && this.props.article.contents[0])}
        />
      <div className="button__toggle-view expand" onClick={()=>{this.props.showArticle(this.props.article)}}></div>
        <span className="article-title" onClick={()=>{this.props.showArticle(this.props.article)}}>{this.props.article.title}</span>
      </div>
    )
  }
}

export default MiniArticle;
