import React from 'react'
import ReactDOM from 'react-dom'
import './draw-card-page.sass'
import {connect} from 'react-redux'

export default class DrawCardPage extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {

	}
	render() {
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
}