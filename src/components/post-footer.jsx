import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './post-footer.sass'
import {lovePost} from 'state/posts.js'

class PostFooter extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let posts = this.props.posts
		let postIndex = this.props.nowPost
		let ep = this.props.nowEp
		return (
			<footer>
				<div className="info-container">
					<button className="love" onClick = {()=>this.props.dispatch(lovePost(postIndex,ep,posts))}>
						<img src="icons/heart.png"/>
						{posts[postIndex].category===1?this.props.loves: posts[postIndex].love}
					</button>
					<a href="#comments-container">
						<button className="comment">
							<img src="icons/comment.png"/>
							{posts[postIndex].category===1?this.props.commentsNum: posts[postIndex].comments.length}
						</button>
					</a>
				</div>
			</footer>
		)
	}
}

export default connect( state => (
	{
		nowPost: state.posts.nowPost,
		posts: state.posts.posts,
		nowEp: state.posts.nowEp,
		loves: state.posts.posts[state.posts.nowPost].episodes[state.posts.nowEp].love,
		commentsNum: state.posts.posts[state.posts.nowPost].episodes[state.posts.nowEp].comments?state.posts.posts[state.posts.nowPost].episodes[state.posts.nowEp].comments.length: 0
	}
))(PostFooter)