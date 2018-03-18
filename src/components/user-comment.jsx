import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './user-comment.sass'
import {addComment} from 'state/posts.js'

class UserComment extends React.Component {
	constructor(props) {
		super(props)
		this.commentHandler = this.commentHandler.bind(this)
		this.commentEvent = this.commentEvent.bind(this)
		this.comment = ''
	}
	render() {
		return (
			<div className="user-comment-container">
				<div className="user-info">
					<div className="user-img">
						G
					</div>
					<div className="info">
						<span>訪客</span>
					</div>
				</div>
				<input placeholder={`馬上回應搶第 ${this.props.floor} 樓...`} 
					onKeyPress={this.commentEvent}
					onChange={this.commentHandler}
					id="user-comment-input"
					/>
			</div>
		)
	}
	commentHandler(e) {
		this.comment = e.target.value
	}
	commentEvent(e) {
		let comment = this.comment
		if ( e.key == 'Enter' && this.comment != '' ) {
			let d = new Date()
			let nowTime = d.getTime()
			let month = d.getMonth()
			let date = d.getDate()
			let hour = d.getHours()
			let minutes = d.getMinutes()
			let content = {
				school: '訪客',
				time: `${month+1}月${date}日 ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`,
				comment: comment
			}
			this.props.dispatch(addComment(this.props.nowPost,this.props.nowEp,content,this.props.posts))
			this.comment = ''
			let dom = document.getElementById('user-comment-input')
			dom.value = ''
		}
	}
}

export default connect( state => (
	{
		nowPost: state.posts.nowPost,
		posts: state.posts.posts,
		nowEp: state.posts.nowEp
	}
))(UserComment)