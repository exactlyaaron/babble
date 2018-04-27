import React from 'react';

class Home extends React.Component {
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
          <div className="popular-tags__wrapper">
            <span className="popular-tags__label">Popular Tags</span>
            <div className="popular-tags__tags">
              <span className="popular-tags__tag"><span>Apple</span></span>
              <span className="popular-tags__tag"><span>Android</span></span>
              <span className="popular-tags__tag"><span>Things</span></span>
              <span className="popular-tags__tag"><span>Windows</span></span>
            </div>
          </div>
          <div className="top-articles__wrapper">
            <div className="top-articles favorite">
              <span className="top-articles__label">Favorite Articles</span>
              <div className="top-articles-list">

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
            </div>
            <div className="top-articles popular">
              <span className="top-articles__label">Popular Articles</span>
              <div className="top-articles-list">

                <div className="article__wrapper mini">
                  <div className="button__copy"></div>
                  <div className="button__toggle-view expand"></div>
                  <span className="article-title">android slow</span>
                </div>

                <div className="article__wrapper mini">
                  <div className="button__copy"></div>
                  <div className="button__toggle-view expand"></div>
                  <span className="article-title">stuff broke</span>
                </div>

                <div className="article__wrapper mini">
                  <div className="button__copy"></div>
                  <div className="button__toggle-view expand"></div>
                  <span className="article-title">i need internet</span>
                </div>

              </div>
            </div>
          </div>

          <div className="main-tabs__wrapper">
            <div className="main-tab active">TAB ONE</div>
            <div className="main-tab">TAB TWO</div>
            <div className="main-tab">TAB THREE</div>
          </div>

        </div>

        <div className="main-articles__wrapper">
          <div className="main-articles__controls">
            <span className="main-articles__control">Expand All</span>
            <span className="main-articles__control">Collapse All</span>
          </div>

          <div className="main-articles__list">
            <div className="article__wrapper">
              <div className="article__controls">
                <div className="button__copy"></div>
                <span className="article-title">i need internet</span>
                <div className="button__toggle-view open"></div>
                <div className="button__toggle-view expand"></div>
              </div>
              <div className="article__contents__wrapper">
                <div className="article__content">
                  <div className="button__copy"></div>
                  <div className="article-content__text">I am text for an article</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <p>Hello, I am {this.props.name}!</p>
      </div>
    )
  }
}

export default Home;
