import React, { Component } from 'react'

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

class MySwiper extends Component {
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
    componentDidMount() {
        new Swiper(".swiper-container", {
            loop: true
        })
    }
}

export default class App extends Component {
    state = {
        list: ["aaa", "bbb", "ccc"]
    }
    render() {
        return (
            <div>
                <MySwiper>
                    {this.state.list.map(item =>
                        <div className="swiper-slide" key={item}>{item}</div>
                    )
                    }
                </MySwiper>
            </div>
        )
    }
}
