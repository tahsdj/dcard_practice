import React from 'react'
import ReactDOM from 'react-dom'
import {compose, applyMiddleware, createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import './main.sass'
import Header from 'components/header.jsx'
import SelectionBox from 'components/selection-box.jsx'
import ContentBox from 'components/content-box.jsx'
import {posts,scroll,getPostsData} from 'state/posts.js'
import {videoLive,playList} from 'state/video.js'
import {notification} from 'state/notification.js'
import DrawCardPage from 'components/draw-card-page.jsx'
//import {postPost} from 'api/posts.js'

export default class Main extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.store = createStore(combineReducers({
			posts,scroll,notification,videoLive,playList
		}),compose(applyMiddleware(thunkMiddleware)))
		let _this = this
		this.store.subscribe(() => {
			//console.log(_this.store.getState());
		})
		//getPostsData()
	}
	componentDidMount() {
		console.log('%c 你知道當你看了console介面一分鐘，非洲就過了60秒。', 'color: red; font-size: 3em')
	}
	render() {
		return (
			<Provider store = {this.store} >
				<div id = "main-screen">
					<Header/>
					<div id = "main-container">
						
						<SelectionBox/>
						<ContentBox/>
					</div>
				</div>
			</Provider>
		)
	}
}

/*
<div id = "main-container">
	<SelectionBox/>
	<ContentBox/>
</div>
*/
/*
let DrawCardPage = (props) => {
	let d = new Date()
	let hours = d.getHours()
	let minutes = d.getMinutes()
	let seconds = d.getSeconds()
	seconds = 60 - seconds
	minutes = seconds !== 0 ? (60 - minutes - 1) : (60 - minutes)
	hours = seconds !== 0 ? (24 - hours - 1) : (24 - hours)
	seconds = seconds >= 10 ? seconds: '0' + seconds 
	minutes = minutes >= 10 ? minutes: '0' + minutes
	hours = hours >= 10 ? hours: '0' + hours
	return (
		<div id="draw-card-container">
			<div className="time-title">
				<span>{`午夜倒數 ${hours}時 ${minutes}分 ${seconds} 秒`}</span>
			</div>
			<div className="draw-container">
				<div className="card-layout">
					<div className="food-board">
						
					</div>
					<img src="icons/question-mark.png"/>
				</div>

				<div className="button-container">
					<button>
						抽卡
					</button>
				</div>
			</div>
		</div>
	)
}
*/

/*



*/