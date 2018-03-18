import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './live-room.sass'
import {clickPost, closePost, changePostPage, changeScroll, addComment,lovePost} from 'state/posts.js'
import Post from 'components/post.jsx'
import UserComment from 'components/user-comment.jsx'
import PostFooter from 'components/post-footer.jsx'
import YouTube from 'react-youtube'
import {updateVideoTime,
		changeVideo, 
		onUpdateVideo, 
		loadVideoData,updateVideo,
		getYoutubeData,
		removePlayListVideo,
		playNext } from 'state/video.js'
import {_onLiveVideo,getSinglePost} from 'api/posts.js'


class LiveRoom extends React.Component {
	constructor(props) {
		super(props)
		this.scroll = 0
		//this.scrollInterval = 0
		this.ep = 0
		this.scrollEvent = this.scrollEvent.bind(this)
		this._onReady = this._onReady.bind(this)
		this.videoUrlHandler = this.videoUrlHandler.bind(this)
		this.videoInputHandler = this.videoInputHandler.bind(this)
		this.changeVideo = this.changeVideo.bind(this)
		//this.onliveVideoHandler = this.onliveVideoHandler.bind(this)
		this.onLiveContent = this.onLiveContent.bind(this)
		this.timer = null,
		this.videoFirstLoad = true
		this.videoEditUrl = ''
	}
	componentWillMount() {
		let post = this.props.posts[this.props.nowPost]
		//getSinglePost(post.key)
		//console.log('video content: '+ post.key)
		this.props.dispatch(loadVideoData(post.key))
	}
	componentDidMount() {
		let d = document.getElementById('content-layout')
		d.addEventListener("scroll", this.scrollEvent)
		_onLiveVideo(this.onLiveContent)
	}
	componentDidUpdate() {
		let d = document.getElementById('content-layout')

		if ( this.ep != this.props.nowEp) {
			d.scrollTo(0,0)
			this.ep = this.props.nowEp
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer)
		let d = document.getElementById('content-layout')
		d.removeEventListener("scroll", this.scrollEvent)
	}
	render() {
		//console.log('now video time:' + this.props.currentVideoTime)
		const opts = {
		      height: '390',
		      width: '640',
		      playerVars: { // https://developers.google.com/youtube/player_parameters
		        autoplay: this.props.stop?0: 1
		      }
		    };
		 const videoDOM = (
		 		<YouTube videoId={this.props.videoId}
						 opts={opts}
						 onEnd={this.changeVideo}
						 onReady={this._onReady}/>
		 	)
		 let videoEditUrl = (
		 		<div className="edit-video-url">
		 			<input placeholder="貼上你想要播放的youtube網址吧"
		 					onChange={this.videoUrlHandler}
		 					onKeyPress={this.videoInputHandler}
		 					/>
		 		</div>
		 	)
		//console.log(this.props.videoId)
		let post = this.props.posts[this.props.nowPost]
		let playListDom = this.props.playList.map( (p,index) => {
			return (
				<PlayListComment
					who={p.user}
					time={p.time}
					comment={''}
					floor={index+1}
					imageUrl={p.videoImage}
					title={p.title}
					key={'playList'+p.videoId}
				/>
			)
		})
		let commentDOM = []
		if ( this.props.commentsNum !== 0 ) {
			commentDOM = post.comments.map( (c,index) => {
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
						<div className="live-title">{post.description}<div className="live-icon"></div><span>live</span></div>
						<span className="time">
							{post.time}
						</span>
					</div>
					{ videoEditUrl}
					<div className="video-container editor-mode">
						{this.props.loadedSuccess && videoDOM}
						<div className="disabled-interface">
						</div>
					</div>
					<div className="rest-time-container">
						<div className="time-bar">
							<span className="now-rest-time" style={{width: `${this.props.restTime*100/90}%`}}></span>
						</div>
						<div className="clock-btn-container">
							<button onClick={()=>{
								if (this.props.restTime > 1) {
									let restTime = this.props.restTime + 15 >= 60 ? 60 : this.props.restTime + 15
									this.props.dispatch(updateVideo(this.currentVideoTime,this.props.videoId,this.props.videoKey,false,false,this.props.playList,restTime))
								}
							}}>
								+
								<img src="icons/clock.png"/>
							</button>
							<span></span>
						</div>
					</div>
					<div className="play-list-container">
						<div className="total-playlists">
							{`${playListDom.length}則許願清單`}
						</div>
						{playListDom}
					</div>
					<div id="comments-container">
						<div className="total-comments">
							{`共${post.comments.length}則回應`}
						</div>
						{commentDOM}
						<UserComment floor={post.comments.length+1}/>
					</div>
				</div>
				<footer>
					<div className="info-container">
						<button className="love" onClick={()=>this.props.dispatch(lovePost(this.props.nowPost,this.props.nowEp,this.props.posts))}>
							<img src="icons/heart.png"/>
							{this.props.love}
						</button>
						<button className="comment">
							<img src="icons/comment.png"/>
							{post.comments.length}
						</button>
					</div>
				</footer>
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
	_onReady(event) {
    // access to player in all event handlers via event.target
	    if (this.videoFirstLoad ) {
	    	event.target.seekTo(this.props.currentVideoTime)
	    	event.target.playVideo()
	    	this.timer = setInterval(()=>{
		    	this.currentVideoTime = event.target.getCurrentTime()
		    	let restTime = this.props.restTime - 1 <= 0 ? 0 : this.props.restTime - 1
		    	if ( restTime === 0 ) {
		    		event.target.seekTo(99999999999)
		    		if (this.props.playList.length > 1)  this.changeVideo()
		    	}
		    	else this.props.dispatch(updateVideo(this.currentVideoTime,this.props.videoId,this.props.videoKey,false,false,this.props.playList,restTime))
		    },1000)
	    }
	}

	changeVideo() {
		//console.log('video end~~~~~~~~~~~~~~~~')
		console.log()
		console.log('now index: '+ this.props.playListCurrentIndex)
		if ( this.props.playList.length > 1) {
			let index = 1 // play next, we always remove the videos have been played
			let vid = this.props.playList[index].videoId
			//this.props.dispatch(changeVideo(vid,this.props.videoKey,index,this.props.playList))
			this.props.dispatch(playNext(0,vid,this.props.videoKey,false,false,this.props.playList))
			//this.props.dispatch(removePlayListVideo(0,this.props.playList,0,this.props.videoKey))
		}
	}
 	videoUrlHandler(e) {
    	this.videoEditUrl = e.target.value
    	console.log(this.videoEditUrl)
    }

    videoInputHandler(e) {
    	if ( e.key === 'Enter' && this.videoEditUrl !== '' ) {
    		//....
    		let text = this.videoEditUrl.split("?v=")
    		let vid = text[text.length-1]
    		//this.props.dispatch(updateVideo(this.currentVideoTime,vid,this.props.videoKey,false,false))
    		this.props.dispatch(getYoutubeData(vid,this.props.playList,this.props.playListCurrentIndex,this.props.videoKey))
    		e.target.value = ''
    	}
    }
    onLiveContent(updatedThings) {
    	this.props.dispatch(onUpdateVideo(updatedThings,this.props.videoKey,this.props.playList))
    }
}


export default connect( state => (
	{
		postClicked: state.posts.clicked,
		posts: state.posts.posts,
		nowPost: state.posts.nowPost,
		scrollInterval: state.scroll.interval,
		//vloaded: state.videoLive.loaded,
		currentVideoTime: state.videoLive.currentVideoTime,
		videoId: state.videoLive.videoId,
		stop: state.videoLive.stop,
		videoKey: state.videoLive.videoKey,
		loadedSuccess: state.videoLive.loadedSuccess,
		playList: state.playList.playList,
		playListCurrentIndex: state.playList.playListCurrentIndex,
		commentsNum:  state.posts.posts[state.posts.nowPost].comments.length,
		restTime: state.videoLive.restTime,
		love: state.posts.posts[state.posts.nowPost].love
	}
))(LiveRoom)


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

const PlayListComment = (props) => {
	//console.log('comment props: '+props.time)
	return (
		<div className={props.floor=== 1? "comment now-playing": "comment"}>
			<div className="video-image-container">
				<img src={props.imageUrl}/>
			</div>
			<div className="user-info-container">
				<div className="user-info">
					<div className={props.who==='訪客'?"user-img visitor":"user-img"}>
						{props.who==='訪客'?'G':'S'}
					</div>
					<div className="info">
						<span>{`${props.who} ${props.floor===1?"正在播放":"想播放"} ${props.title}`}</span>
						<span>{`PLAY${props.floor}`} | {props.time}</span>
					</div>
				</div>
				<div className="content">
					{props.comment}
				</div>
			</div>
		</div>
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