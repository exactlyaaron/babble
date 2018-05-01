import React from 'react';
import _ from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        displayModal: false
    }
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

  renderMainArticles = () => {
    return (
      <div className="main-articles__list">
        <div className="article__wrapper closed">
          <div className="article__controls">
            <div className="button__copy"></div>
            <div className="button__toggle-view expand"></div>
            <div className="button__toggle-view open"></div>
            <span className="article-title">i need internet</span>
          </div>
          <div className="article__contents__wrapper">
            <div className="article__content">
              <div className="button__copy"></div>
              <div className="article-content__text">
                I am text for an article about why internet is missing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt nibh a mi fringilla, id facilisis tellus lacinia. Curabitur bibendum leo a pharetra convallis. Praesent lobortis mi sit amet ex faucibus facilisis. Integer sed bibendum dolor. Praesent eget lorem scelerisque, porta sem in, rhoncus augue. Nulla faucibus mauris vel turpis tempor efficitur. Quisque molestie nisi aliquet justo semper tincidunt in ac nulla. Sed ullamcorper volutpat purus. In dolor turpis, tincidunt et ornare sit amet, cursus quis turpis. Aliquam ullamcorper varius nisi, in molestie augue. Nulla facilisis a elit vel varius. Quisque lacinia efficitur neque id ultricies. Praesent sed maximus tellus, eget semper enim.
              </div>
            </div>
          </div>
        </div>

        <div className="article__wrapper opened">
          <div className="article__controls">
            <div className="button__copy"></div>
            <div className="button__toggle-view expand" onClick={this.toggleModal}></div>
            <div className="button__toggle-view open"></div>
            <span className="article-title">i need internet</span>
          </div>
          <div className="article__contents__wrapper">
            <div className="article__content">
              <div className="button__copy"></div>
              <div className="article-content__text">
                I am text for an article about why internet is missing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt nibh a mi fringilla, id facilisis tellus lacinia. Curabitur bibendum leo a pharetra convallis. Praesent lobortis mi sit amet ex faucibus facilisis. Integer sed bibendum dolor. Praesent eget lorem scelerisque, porta sem in, rhoncus augue. Nulla faucibus mauris vel turpis tempor efficitur. Quisque molestie nisi aliquet justo semper tincidunt in ac nulla. Sed ullamcorper volutpat purus. In dolor turpis, tincidunt et ornare sit amet, cursus quis turpis. Aliquam ullamcorper varius nisi, in molestie augue. Nulla facilisis a elit vel varius. Quisque lacinia efficitur neque id ultricies. Praesent sed maximus tellus, eget semper enim.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  articleClick = (e) => {
    console.log('child click')
    e.stopPropagation();
  }

  renderArticleModal = () => {
    if(this.state.displayModal){
      return (
        <div className="article-modal__wrapper" onClick={this.toggleModal}>
          <div className="article-modal__close" onClick={this.toggleModal}></div>
          <div className="article__wrapper" onClick={this.articleClick}>
            <div className="article__controls">
              <div className="button__copy"></div>
              <div className="button__toggle-view collapse" onClick={this.toggleModal}></div>
              <span className="article-title">i need internet</span>
            </div>
            <div className="article__contents__wrapper">
              <div className="article__content">
                <div className="button__copy"></div>
                <div className="article-content__text">
                  I am text for an article about why internet is missing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt nibh a mi fringilla, id facilisis tellus lacinia. Curabitur bibendum leo a pharetra convallis. Praesent lobortis mi sit amet ex faucibus facilisis. Integer sed bibendum dolor. Praesent eget lorem scelerisque, porta sem in, rhoncus augue. Nulla faucibus mauris vel turpis tempor efficitur. Quisque molestie nisi aliquet justo semper tincidunt in ac nulla. Sed ullamcorper volutpat purus. In dolor turpis, tincidunt et ornare sit amet, cursus quis turpis. Aliquam ullamcorper varius nisi, in molestie augue. Nulla facilisis a elit vel varius. Quisque lacinia efficitur neque id ultricies. Praesent sed maximus tellus, eget semper enim.
                </div>
              </div>
              <div className="article__related">RELATED</div>
              <div className="article__previous">PREVIOUS</div>
            </div>
          </div>
        </div>
      )
    }
    return (null)
  }

  toggleModal = (e) => {
    // if(manual){
    //   this.setState({displayModal: true})
    // }
    e.preventDefault();
    console.log('parent')
    this.setState({displayModal: !this.state.displayModal})
  }


  render() {
    return (
      <div>
        {this.renderArticleModal()}
        <div className="top-area__wrapper">
          <div className="header__wrapper">
            <div className="logo"></div>
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

          {this.renderMainArticles()}

        </div>
        <p>Hello, I am {this.props.name}!</p>
      </div>
    )
  }
}

export default Home;
