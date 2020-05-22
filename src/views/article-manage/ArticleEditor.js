import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html'
// 方式一、draft对象==>html 方便存储数据库 (预览功能，直接取出，显示在html页面上-强烈推荐）
// 方式二、draft 对象==> markdown 存到数据库

// 引入 转化 html 代码为 draft对象的辅助插件等(记得下载 微笑脸)
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';

export default class ArticleEditor extends Component {
  state = {
    editorState: '', // 记录状态，预设内容
    contentState: '' // 内容状态
  }

  componentDidMount() {
    // console.log("第一次会执行", this.props.content)
    // 避免添加文章时插件报错，因其并不需要传递content及key值，仅有一辈子，走到此生命周期时 content值是undifined， 故会引起插件报错
    if (!this.props.content) {
      return;
    }
    // 转化 html 代码为 draft对象等一顿操作
    const html = this.props.content;
    // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks); //内容状态
      const editorState = EditorState.createWithContent(contentState);//编辑器状态
      this.setState({
        editorState
      })
    }

  }
  render() {
    return (
      <div>
        {/* 因为是 Update 子组件啊... */}
        {/* {this.props.content}  */}
        <Editor
          editorState={this.state.editorState} //编辑器状态
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          // contentState={this.state.contentState} // 内容状态
          onEditorStateChange={this.onEditorStateChange} // 同步编辑器状态
          onContentStateChange={this.onContentStateChange}  // 同步内容状态
          // 失焦事件
          onBlur={() => {
            // console.log('失去焦点',draftjsToHtml(this.state.contentState))
            //子=>父通信
            this.props.onEvent(draftjsToHtml(this.state.contentState))
          }}
        />
      </div>
    )
  }

  // 同步内容状态方法
  onContentStateChange = (contentState) => {
    // console.log(contentState)
    // console.log(draftjsToHtml(contentState))
    // contentState ==> html 格式代码 ===> 存到数据库中
    this.setState({
      contentState
    })
  }
  // 同步编辑器状态方法
  onEditorStateChange = (editorState) => { // 接收到的是实时编辑状态
    // console.log(editorState)
    this.setState({
      editorState
    })
  }
}
