import React, { Component } from 'react'

export default class App extends Component {
    state = {
        text: "aaa"
    }
    render() {
        return (
            <div>
                app -{this.state.text}
            </div>
        )
    }

    // 更改成以下形式控制台就不会再报经过-临时解决方案-与新的生命周期不能共存
    // UNSAFE_componentWillMount() {
    //     console.log("componentWillMount")
    //     this.setState({text:"222222"})
    // }

    static getDerivedStateFromProps(nextProps,nextState) {
        console.log("componentWillMount")
        return {
            text: "bbb"+"+"+nextState.text
        }
    }
}
