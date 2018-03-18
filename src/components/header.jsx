import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './header.sass'
import {clickIcon,unClickIcon} from 'state/notification.js'

class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let posts = this.props.posts
		return (
			<header>
				{ this.props.notificationClicked && <div className="whole-screen" onClick={()=>this.props.dispatch(unClickIcon())}>
					</div>
				}
				<div className="header-container">
					<div className="left-container">
						<div className="logo">
							<span>
								D
							</span>
							<span>
								live
							</span>
						</div>
						<div id="search">
							<input placeholder="搜尋文章、看板、人物"/>
							<button>
								<span>
									<img src="icons/search.png"/>
								</span>
							</button>
						</div>
					</div>
					<div className="right-container">
						<ul>
							<li className={this.props.notificationClicked?"clicked":""} onClick={()=>this.props.dispatch(clickIcon())}>
								<span className="icon-label">
									<img src="icons/notification.png"/>
								</span>
								<div className="title-name">
									通知
								</div>
								{this.props.notificationClicked && <NotificationBox posts={posts}/>}
							</li>
							<li>
								<span className="icon-label">
									<img src="icons/card.png"/>
								</span>
								<div className="title-name">
									抽卡
								</div>
							</li>
							<li>
								<span className="icon-label">
									<img src="icons/mail.png"/>
								</span>
								<div className="title-name">
									信件
								</div>
							</li>
							<li>
								<span className="icon-label">
									<img src="icons/user.png"/>
								</span>
								<div className="title-name">
									我
								</div>
							</li>
						</ul>
						<span className="more-btn">
							<img src="icons/more.png"/>
						</span>
					</div>
				</div>
			</header>
		)
	}
}


export default connect( state => (
	{
		notificationClicked: state.notification.iconClicked,
		posts: state.posts.posts
	}
))(Header)

let NotificationBox = (props) => {
	let notificationDOM = props.posts.map( p => (
			<Notification content={p.userName + ' 發布新文章'}
							time={p.time.split(" ")[0]}/>
		))
	return (
		<div className="notification-container">
			<div className="labels-title">
				<span className="label">通知</span>
				<span className="label">全部標示為已讀</span>
			</div>
			{notificationDOM}
		</div>
	)
}

let Notification = (props) => {
	return (
		<div className="notification-card">

			<div className="notification-img">
				<span>S</span>
			</div>
			<div className="info-box">
				<p className="description">{props.content}</p>
				<span className="time">{props.time}</span>
			</div>
		</div>
	)
}