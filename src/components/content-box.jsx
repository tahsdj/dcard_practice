import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './content-box.sass'
import {clickPost, closePost, getPostsData} from 'state/posts.js'
import Post from 'components/post.jsx'
import ContentDetail from 'components/content-detail.jsx'
import LiveRoom from 'components/live-room.jsx'

class ContentBox extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.props.dispatch(getPostsData())
	}
	render() {
		let posts = null
		if ( this.props.posts.length !== 0 ) {
			posts = this.props.posts.map( (p,id) => (
				<Post title={p.name} 
						description={p.description} 
						image={p.category === 1 ? p.episodes[0]:''} 
						cid={p.cid} 
						key={'post'+id} 
						postIndex={id}
						name={p.userName}
						category={p.category}/>
			))
		}
		return (
			<div className="content-container">
				<div className="content-layout">
					<div className="header">
						<span className="category-name">
							全部
						</span>
						<div className="category-list-container">
							<span className="category selected">
								熱門文章
							</span>
							<span className="category">
								最新文章
							</span>
						</div>
						<button>
							發文
						</button>
					</div>
					{ this.props.loading && <LoadingPost/>}
					{posts}
				</div>
				{	this.props.postClicked && (<div className="filter" onClick={()=>this.props.dispatch(closePost(this.props.posts))}>
					</div>)
				}
				{  this.props.postClicked && (this.props.posts[this.props.nowPost].category === 1 ? <ContentDetail/>: <LiveRoom/>)}

			</div>
		)
	}
}


export default connect( state => (
	{
		postClicked: state.posts.clicked,
		posts: state.posts.posts,
		loading: state.posts.loading,
		nowPost: state.posts.nowPost
	}
))(ContentBox)

const LoadingPost = () => {

	return (
		<div className="post-container post-loading">
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
/*
const LiveRoom = (props) => {
	return (
		<div className = "content-detail-container">
			<header>
				<div className="profile">
					S
				</div>
				<div className="profile-info row">
					系統.每日隨便推薦
				</div>
			</header>
			<div className="content-layout">
				<div className="title" >
					<h3>#漫畫 #推薦　海賊王</h3>
					<span className="time">
						3月3日 14:52
					</span>
				</div>
				<div className="images-layout">
				</div>
				<div className="comments-container">
					<div className="total-comments">
						共2則回應
					</div>
					<Comment/>
					<Comment/>
					<div className="user-comment-container">
						<input placeholder="馬上回應搶第 3 樓..."/>
					</div>
				</div>
			</div>
			<footer>
				<div className="info-container">
					<button className="love">
						<img src="icons/heart.png"/>
						87
					</button>
					<button className="comment">
						<img src="icons/comment.png"/>
						8
					</button>
				</div>
			</footer>
		</div>
	)
}
*/
/*
let Post = (props) => {
	return (
		<div className="post-container">
			<div className="info-container row">
				<div className="info-header row">
					<div className="profile">
						S
					</div>
					<div className="profile-info">
						系統.每日隨便推薦
					</div>
				</div>
				<div className="title-info row">
					#漫畫 #推薦　海賊王
				</div>
				<div className="caption-info row">
					主角是一個橡膠果實的能力者，目標是成為海賊王
				</div>
				</div>
			<div className= "image-container">
				<img src="http://pic.8comic.se/wp-content/uploads/a04cj84wj6uq04/1152/001/004.jpg" />
			</div>
		</div>
	)
}
*/
/*
let ContentDetail = (props) => {
	return (
		<div className = "content-detail-container">
			<header>
				<div className="profile">
					S
				</div>
				<div className="profile-info row">
					系統.每日隨便推薦
				</div>
			</header>
			<div className="content-layout">
				<div className="title" >
					<h3>#漫畫 #推薦　海賊王</h3>
					<span className="time">
						3月3日 14:52
					</span>
				</div>
				<div className="images-layout">
					<img className ="pictures" src="http://pic.8comic.se/wp-content/uploads/a04cj84wj6uq04/1152/001/004.jpg"/>
					<img className="pictures" src="http://pic.8comic.se/wp-content/uploads/a04cj84wj6uq04/1152/001/030.jpg"/>
				</div>
				<div className="comments-container">
					<div className="total-comments">
						共2則回應
					</div>
					<Comment/>
					<Comment/>
					<div className="user-comment-container">
						<input placeholder="馬上回應搶第 3 樓..."/>
					</div>
				</div>
			</div>
			<span className="next turn-page-icon">
				<img className="icon" src="icons/next.png"/>
				<Post/>
			</span>
			<span className="back turn-page-icon">
				<img className="icon" src="icons/back.png"/>
				<Post/>
			</span>
			<footer>
				<div className="info-container">
					<button className="love">
						<img src="icons/heart.png"/>
						87
					</button>
					<button className="comment">
						<img src="icons/comment.png"/>
						8
					</button>
				</div>
			</footer>
		</div>
	)
}
*/
let Comment = (props) => {
	return (
		<div className="comment">
			<div className="user-info">
				<div className="user-img">
					S
				</div>
				<div className="info">
					<span>成功大學</span>
					<span>B1 | 3月3日 14:59</span>
				</div>
			</div>
			<div className="content">
				漫畫測試...
			</div>
		</div>
	)
}