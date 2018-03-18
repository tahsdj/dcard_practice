import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './content-box.sass'
import {clickPost, closePost, changePostPage, changeScroll, addComment,lovePost} from 'state/posts.js'
import Post from 'components/post.jsx'
import UserComment from 'components/user-comment.jsx'
import PostFooter from 'components/post-footer.jsx'


class ContentDetail extends React.Component {
	constructor(props) {
		super(props)
		this.scroll = 0
		//this.scrollInterval = 0
		this.ep = 0
		this.scrollEvent = this.scrollEvent.bind(this)
	}
	componentDidMount() {
		let d = document.getElementById('content-layout')
		d.addEventListener("scroll", this.scrollEvent)
	}
	componentDidUpdate() {
		let d = document.getElementById('content-layout')

		if ( this.ep != this.props.nowEp) {
			d.scrollTo(0,0)
			this.ep = this.props.nowEp
		}
	}
	componentWillUnmount() {
		let d = document.getElementById('content-layout')
		d.removeEventListener("scroll", this.scrollEvent)
	}
	render() {
		let p = this.props.posts[this.props.nowPost] //p = post
		let ep = this.props.nowEp
		let images = []
		for ( let i = 0 ; i < p.episodes[ep].pages ; i++ ) {
			let epText = (p.episodes[ep].ep >= 100)? p.episodes[ep].ep: (p.episodes[ep].ep >=10 ? '0'+p.episodes[ep].ep : '00'+p.episodes[ep].ep)
			let index = i + 1
			index = (index >= 100)? index: (index >=10 ? '0'+ index : '00'+index)
			let temp = (
					<img className ="pictures" 
						key={'img' + index}
						src={"http://pic.8comic.se/wp-content/uploads/a04cj84wj6uq04/"+p.cid+"/"+epText+"/"+index+".jpg"}/>
				)
			images = [...images,temp]
		}
		// comments dom
		let commentDOM = []
		if ( this.props.commentsNum !== 0 ) {
			commentDOM = p.episodes[ep].comments.map( (c,index) => {
				return (
					<Comment
						who={c.school}
						time={c.time}
						comment={c.comment}
						floor={index+1}
						key={'comment'+index}
					/>
				)
			})
		}
		return (
			<div className = "content-detail-container">
				{ this.props.scrollInterval >= -0.5 && <PostHeader/>}
				<div id="content-layout">
					<div className="title" >
						<h3>#漫畫 #推薦 {p.name} 第{p.episodes[ep].ep}話</h3>
						<span className="time">
							3月3日 14:52
						</span>
					</div>
					<div className="images-layout">
						{images}
					</div>
					<div id="comments-container">
						<div className="total-comments">
							{`共${commentDOM.length}則回應`}
						</div>
						{commentDOM}
						<UserComment floor={commentDOM.length+1}/>
					</div>
				</div>
				{ (this.props.nowEp !== 0) && (<span className="next turn-page-icon"
														onClick={()=>this.props.dispatch(changePostPage(this.props.nowPost,this.props.nowEp,-1,this.props.posts))}
															>
																						
					<img className="icon" src="icons/next.png"/>
					<Post title={p.name} 
							description={p.description}
							image={p.episodes[this.props.nowEp-1]} 
							cid={p.cid} 
							key={p.cid}
							postIndex={this.props.nowPost}
							name={p.userName}
							category={p.category}/>
					</span>
					)
				}
				{ (this.props.posts[this.props.nowPost].episodes.length > this.props.nowEp+1) && (<span className="back turn-page-icon"
														onClick={()=>this.props.dispatch(changePostPage(this.props.nowPost,this.props.nowEp,1,this.props.posts))}
													>
					<img className="icon" src="icons/back.png"/>
					<Post title={p.name} 
							description={p.description}
							image={p.episodes[this.props.nowEp+1]} 
							cid={p.cid} 
							key={p.cid} 
							postIndex={this.props.nowPost}
							name={p.userName}
							category={p.category}/>
					</span>
					)
				}
				<PostFooter/>
			</div>
		)
	}
	scrollEvent(e) {
		//console.log(e.target.scrollTop)
		let interval = this.scroll - e.target.scrollTop
		//console.log(this.srcollInterval)
		this.props.dispatch(changeScroll(interval))
		this.scroll = e.target.scrollTop
	}
}


export default connect( state => (
	{
		postClicked: state.posts.clicked,
		posts: state.posts.posts,
		nowPost: state.posts.nowPost,
		nowEp: state.posts.nowEp,
		scrollInterval: state.scroll.interval,
		commentsNum: state.posts.posts[state.posts.nowPost].episodes[state.posts.nowEp].comments?state.posts.posts[state.posts.nowPost].episodes[state.posts.nowEp].comments.length: 0
	}
))(ContentDetail)


let PostHeader = (props) => {
	return (
		<header>
			<div className="profile">
				S
			</div>
			<div className="profile-info row">
				系統.每日隨便推薦
			</div>
		</header>
	)
}

let Comment = (props) => {
	//console.log('comment props: '+props.time)
	return (
		<div className="comment">
			<div className="user-info">
				<div className={props.who==='訪客'?"user-img visitor":"user-img"}>
					{props.who==='訪客'?'G':'S'}
				</div>
				<div className="info">
					<span>{props.who}</span>
					<span>{`B${props.floor}`} | {props.time}</span>
				</div>
			</div>
			<div className="content">
				{props.comment}
			</div>
		</div>
	)
}

/*
let UserComment = (props) => {
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
			<input placeholder={`馬上回應搶第 ${props.floor} 樓...`}/>
		</div>
	)
}
*/
/*
let PostFooter = (props) => {
	return (
		<footer>
			<div className="info-container">
				<button className="love">
					<img src="icons/heart.png" onClick = {()=> props.dispatch(props.loveIt())}/>
					{props.love}
				</button>
				<a href="#comments-container">
					<button className="comment">
						<img src="icons/comment.png"/>
						{props.comments}
					</button>
				</a>
			</div>
		</footer>
	)
}
*/