import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

class MySwiper extends Component {
  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">111</div>
          <div className="swiper-slide">222</div>
          <div className="swiper-slide">333</div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    new Swiper('.swiper-container',{
      loop:true
    })
  }
}
export default class App extends Component {
  render() {
    return (
      <div>
        <MySwiper></MySwiper>
      </div>
    )
  }
}
