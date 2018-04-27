import React from 'react';

class Home extends React.Component {
  renderPopularTags = () => {
    return (
      <div className="popular-tags__wrapper">
        <span className="popular-tags__label">Popular Tags</span>
        <div className="popular-tags__tags">
          <span className="popular-tags__tag"><span>Apple</span></span>
          <span className="popular-tags__tag"><span>Android</span></span>
          <span className="popular-tags__tag"><span>Things</span></span>
          <span className="popular-tags__tag"><span>Windows</span></span>
        </div>
      </div>
    )
  }

  renderTopArticles = (type) => {
    return (
      <div className={`top-articles ${type}`}>
        <span className="top-articles__label">{type.charAt(0).toUpperCase()+type.substr(1)} Articles</span>
        <div className="top-articles-list">
          {this.renderMiniArticles(type)}
        </div>
      </div>
    )
  }

  renderMiniArticles = (type) => {
    return (
      <div>
        <div className="article__wrapper mini">
          <div className="button__copy"></div>
          <div className="button__toggle-view expand"></div>
          <span className="article-title">Opening Blob with a stupidly long title because stuff</span>
        </div>

        <div className="article__wrapper mini">
          <div className="button__copy"></div>
          <div className="button__toggle-view expand"></div>
          <span className="article-title">Greeting</span>
        </div>

        <div className="article__wrapper mini">
          <div className="button__copy"></div>
          <div className="button__toggle-view expand"></div>
          <span className="article-title">Closing</span>
        </div>
      </div>
    )
  }

  renderMainTabs = () => {
    return (
      <div className="main-tabs__wrapper">
        <div className="main-tab active">TAB ONE</div>
        <div className="main-tab">TAB TWO</div>
        <div className="main-tab">TAB THREE</div>
      </div>
    )
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
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="top-area__wrapper">
          <div className="header__wrapper">
            <div className="logo"></div>
          </div>
          <div className="search__wrapper">
            <input type="text" placeholder="What do you want" />
          </div>
          {this.renderPopularTags()}

          <div className="top-articles__wrapper">
            {this.renderTopArticles('favorite')}
            {this.renderTopArticles('popular')}
          </div>

          {this.renderMainTabs()}

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
