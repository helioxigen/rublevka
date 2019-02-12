import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';
import Swipeable from 'react-swipeable';

import cn from 'classnames';

export default (s = {}, { RetinaImage, Icon }) => {
  return class extends Component {
    static propTypes = {
      images: PropTypes.array.isRequired,
    };

    constructor(props) {
      super(props);
      const { images, currentSlide = 0, fullscreenOnly } = this.props;

      this.state = {
        navTransform: 0,
        imagesLastIndex: images.length - 1,
        imagesLength: images.length,
        navWidth: 0,
        navItemWidth: 0,
        sliderWidth: 0,
        imgLoaded: 0,
        fullscreen: fullscreenOnly,
        currentSlide,
        images,
      };

      this.updateWidth = ::this.updateWidth;
    }

    onKeyLeft() {
      this.onBtnClick(this.state.currentSlide - 1);
    }

    onKeyRight() {
      this.onBtnClick(this.state.currentSlide + 1);
    }

    componentWillMount() {
      Mousetrap.bind(`left`, ::this.onKeyLeft);
      Mousetrap.bind(`right`, ::this.onKeyRight);
    }

    componentWillUnmount() {
      Mousetrap.unbind(`left`);
      Mousetrap.unbind(`right`);
      window.removeEventListener(`resize`, this.updateWidth);
    }

    componentDidMount() {
      window.addEventListener(`resize`, this.updateWidth);
    }

    shouldComponentUpdate(nextProps, nextState) {
      const { navWidth, sliderWidth } = this.state;
      const { navTransform } = nextState;

      if (sliderWidth - navWidth > 0) return true;
      if (navTransform > 0) return false;
      if (navTransform < sliderWidth - navWidth) return false;
      return true;
    }

    onBtnClick(index) {
      if (index < 0) {
        this.setState({ currentSlide: this.state.imagesLength - 1 });
        this.animateNav(this.state.imagesLength - 1);
      } else if (index >= this.state.imagesLength) {
        this.setState({ currentSlide: 0 });
        this.animateNav(0);
      } else {
        this.setState({ currentSlide: index });
        this.animateNav(index);
      }
    }

    onImgLoad() {
      const { imgLoaded, imagesLength } = this.state;
      if (imgLoaded + 1 === imagesLength) {
        this.updateWidth();
        return;
      }
      this.setState({
        imgLoaded: imgLoaded + 1,
      });
    }

    onNavBtnClick(direction) {
      // this.updateWidth();
      const { sliderWidth, navItemWidth, navWidth } = this.state;
      let transform;

      if (navWidth <= sliderWidth) return;

      if (navWidth - sliderWidth <= sliderWidth) {
        // если влезает в 1 прокрутку
        if (direction === `left`) {
          this.slideNavToStart();
        } else if (direction === `right`) {
          this.slideNavToEnd();
        }
      } else {
        // если не влезает в 1 прокрутку
        // доводчик, если не влезает в длину навбара
        const slideCount = Math.floor(sliderWidth / navItemWidth);
        const offset = sliderWidth - slideCount * navItemWidth;

        if (direction === `right`) {
          transform = -sliderWidth + offset;

          if (this.state.transform + transform <= sliderWidth - navWidth) {
            // to end
            transform = sliderWidth - navWidth;
            this.setState({
              navTransform: transform,
            });
            return;
          }

          this.setState({
            navTransform: this.state.navTransform + transform,
          });
        } else if (direction === `left`) {
          transform = sliderWidth - offset;

          if (this.previousTransform + transform >= 0) {
            // to start
            this.slideNavToStart();
            return;
          }

          this.setState({
            navTransform: this.state.navTransform + transform,
          });
        }
      }
    }

    animateNav(slideToAnimate) {
      const {
        currentSlide,
        imagesLastIndex,
        navWidth,
        sliderWidth,
      } = this.state;
      const slider = this.refs.slider;
      let direction;

      const navItemWidth = this.props.hideNav
        ? 0
        : this.refs[`navItem${slideToAnimate}`].clientWidth;

      if (currentSlide > slideToAnimate) {
        direction = `left`;
      } else if (currentSlide < slideToAnimate) {
        direction = `right`;
      } else return;

      if (sliderWidth >= navWidth) return;

      const sliderOffset = Math.floor(
        slider.getBoundingClientRect()[direction],
      );
      const navItemOffset = Math.floor(
        this.refs[`navItem${slideToAnimate}`].getBoundingClientRect()[
          direction
        ],
      );
      const delta = Math.floor(sliderOffset - navItemOffset);
      const transform =
        direction === `right` ? delta - navItemWidth : delta + navItemWidth;
      const transformToApply = this.state.navTransform + transform; // < sliderWidth - navWidth

      if (slideToAnimate === 0 || transformToApply > 0) {
        this.slideNavToStart();
        return;
      }

      if (
        slideToAnimate === imagesLastIndex ||
        transformToApply < sliderWidth - navWidth
      ) {
        this.slideNavToEnd();
        return;
      }

      if (
        delta < navItemWidth &&
        slideToAnimate < imagesLastIndex &&
        slideToAnimate > 0
      ) {
        if (direction === `left` && transform < 0) return;
        if (direction === `right` && transform > 0) return;

        this.setState({
          navTransform: transformToApply,
        });
      }
    }

    slideNavToStart() {
      this.setState({
        navTransform: 0,
      });
    }

    slideNavToEnd() {
      const { sliderWidth, navWidth } = this.state;
      const navTransform = sliderWidth - navWidth;
      this.setState({
        navTransform,
      });
    }

    updateWidth() {
      const { imagesLength } = this.state;
      const sliderWidth = this.refs.slider.offsetWidth;

      let navWidth = 0;
      for (let index = 0; index < imagesLength; index++) {
        const width = this.refs[`navItem${index}`].clientWidth;
        navWidth += width;
      }

      this.setState({
        // navItemWidth: navItemWidth,
        navWidth,
        sliderWidth,
      });
    }

    slideTo(index) {
      if (this.state.currentSlide !== index) {
        this.setState({
          currentSlide: index,
        });
        this.animateNav(index);
      }
    }

    close() {
      this.fullscreenToggle();
      if (this.props.onClose) this.props.onClose();
    }

    fullscreenToggle() {
      this.setState({
        fullscreen: !this.state.fullscreen,
      });
    }

    navSwipedRight() {
      this.onNavBtnClick(`left`);
    }

    navSwipedLeft() {
      this.onNavBtnClick(`right`);
    }

    render() {
      const { fullscreen, currentSlide, navTransform } = this.state;
      const title = this.props.title;
      const slideTransform = this.state.images.map((item, index) => {
        const offset = (currentSlide - index) * -100;

        return {
          transform: `translate3d(${offset}%, 0px, 0px)`,
          WebkitTransform: `translate3d(${offset}%, 0px, 0px)`,
          msTransform: `translate3d(${offset}%, 0px, 0px)`,
        };
      });

      const navStyle = {
        transform: `translateX(${navTransform}px)`,
        WebkitTransform: `translateX(${navTransform}px)`,
        msTransform: `translateX(${navTransform}px)`,
      };

      return (
        <div
          className={cn(s.carousel, { [s.isFullscreen]: fullscreen })}
          ref="slider"
        >
          <div
            className={s.overlay}
            onClick={
              this.props.fullscreenOnly ? ::this.close : ::this.fullscreenToggle
            }
          />

          {this.state.imagesLength > 1 && (
            <div>
              <button
                className={cn(s.trackBtn, s.trackBtnLeft)}
                onClick={this.onBtnClick.bind(this, currentSlide - 1)}
              >
                <Icon
                  className={cn(s.trackIcon, s.trackIconLeft)}
                  icon="arrow-down"
                />
              </button>
              <button
                className={cn(s.trackBtn, s.trackBtnRight)}
                onClick={this.onBtnClick.bind(this, currentSlide + 1)}
              >
                <Icon
                  className={cn(s.trackIcon, s.trackIconRight)}
                  icon="arrow-down"
                />
              </button>
            </div>
          )}

          <button
            className={s.trackBtn}
            onClick={
              this.props.fullscreenOnly ? ::this.close : ::this.fullscreenToggle
            }
          >
            {this.props.fullscreenOnly && (
              <Icon className={s.trackIcon} icon="times" />
            )}
          </button>

          <Swipeable
            className={s.width}
            onSwipedLeft={this.onBtnClick.bind(this, currentSlide + 1)}
            onSwipedRight={this.onBtnClick.bind(this, currentSlide - 1)}
          >
            <div
              onClick={this.onBtnClick.bind(this, currentSlide + 1)}
              ref="sliderWrapper"
            >
              {this.state.images.map((item, index) => (
                <div
                  className={
                    this.props.hideNav ? s.trackSlideFull : s.trackSlide
                  }
                  key={index}
                  style={slideTransform[index]}
                >
                  <RetinaImage
                    className={s.trackImage}
                    src={item.src}
                    size={1024}
                    alt={item.id}
                  />
                </div>
              ))}
            </div>
          </Swipeable>

          {this.props.title && (
            <h6 className={s.title}>
              {title} ({this.state.images.length})
            </h6>
          )}

          {!this.props.hideNav && (
            <div className={s.nav}>
              <Swipeable
                onSwipedLeft={::this.navSwipedLeft}
                onSwipedRight={::this.navSwipedRight}
              >
                <div style={navStyle} className={s.navItemContainer} ref="nav">
                  {(this.props.thumbnails || this.state.images).map(
                    (item, index) => {
                      return (
                        <div
                          className={cn(s.navItem, {
                            [s.isActive]: index === currentSlide,
                          })}
                          onClick={this.slideTo.bind(this, index)}
                          ref={`navItem${index}`}
                          key={index}
                        >
                          <RetinaImage
                            className={s.navItemImage}
                            src={item.src}
                            size={128}
                            alt={item.id}
                            onLoad={::this.onImgLoad}
                          />
                        </div>
                      );
                    },
                  )}
                </div>
              </Swipeable>
            </div>
          )}
        </div>
      );
    }
  };
};
