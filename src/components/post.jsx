import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './post.sass'
import {clickPost, closePost} from 'state/posts.js'

class Post extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let index = this.props.postIndex
		let ep = this.props.nowEp
		let episode = this.props.image.ep
		episode = episode >= 100? episode : (episode >= 10 ? '0' + episode : '00' + episode)
		return (
			<div className="post-container" onClick={()=>this.props.dispatch(clickPost(index,ep,this.props.posts))}>
				<div className="info-container row">
					<div className="info-header row">
						<div className="profile">
							S
						</div>
						<div className="profile-info">
							<span>{this.props.name}</span>
							{this.props.category===1 && <span>(合集)</span>}
							{this.props.category===2 && (<div className="live-title-container">
															<div className="live-icon">
															</div>
															<span>live</span>
														</div>)}
						</div>
					</div>
					<div className="title-info row">
						{this.props.title} {this.props.category===1?`第${this.props.image.ep}話`:""}
					</div>
					<div className="caption-info row">
						{this.props.description.length>25?this.props.description.substring(25,0)+'...':this.props.description}
					</div>
					</div>
				<div className= "image-container">
					{this.props.posts[index].category === 1 && <img src={"http://pic.8comic.se/wp-content/uploads/a04cj84wj6uq04/"+this.props.cid+"/"+episode+"/002.jpg"}/>}
				</div>

			</div>
		)
	}
}


export default connect( state => (
	{
		postClicked: state.posts.clicked,
		posts: state.posts.posts,
		nowEp: state.posts.nowEp
	}
))(Post)
