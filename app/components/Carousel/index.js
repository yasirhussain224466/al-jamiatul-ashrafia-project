/* eslint-disable no-return-assign */
import React, { Component } from "react";
import Slider from "react-slick";

import * as S from "./styled";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      changeBorder: null,
      FixtureData: [
        "https://www.tripleserviceinc.com/wp-content/uploads/2022/04/f46788d2-1da2-4337-8e98-7b295986a432.jpg",
        "https://www.huntlyplumbers.co.nz/images/800/546/scp-img-plumbing?h=613021e4",
        "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/10/featured-image-plumbing-repair-cost.jpeg",
        "https://images.wisegeek.com/plumber-installing-fixture.jpg",
      ],
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  afterChangeEvent = (afterChange) => {
    console.log("after", afterChange);

    this.setState({
      changeBorder: afterChange,
    });
  };

  render() {
    return (
      <S.Wrapper>
        <div className="slider-wrapper">
          <div className="media">
            <Slider
              ref={(slider) => (this.slider1 = slider)}
              asNavFor={this.state.nav2}
            >
              {this.state.FixtureData.map((item) => (
                <div>
                  <img
                    alt=""
                    src={item}
                    style={{
                      width: "350px",
                      height: "165px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="nav">
            <Slider
              ref={(slider) => (this.slider2 = slider)}
              afterChange={this.afterChangeEvent}
              asNavFor={this.state.nav1}
              draggable
              focusOnSelect
              onSwipe={this.onSwipeEvent}
              slidesToShow={3}
              swipeToSlide
              touchThreshold={50}
            >
              {this.state.FixtureData.map((item, i) => (
                <div>
                  <div>
                    <img
                      alt=""
                      className={`inner-nav  ${
                        this.state.changeBorder === i ? "blue" : ""
                      }`}
                      src={item}
                      style={{ width: "65px" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </S.Wrapper>
    );
  }
}
