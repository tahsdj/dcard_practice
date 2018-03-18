import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './selection-box.sass'

class SelectionBox extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div id="selection-list-container">
				<div className="selection all-info selected">
					<span>全部</span>
				</div>
				<div className="selection my-description">
					<span>我的訂閱</span>
				</div>
				<div className="selection board-section">
					<span>分類看板</span>
				</div>
				<div className="selection board-section">
					<span>校園看板</span>
				</div>
			</div>
		)
	}
}


export default connect( state => (
	{
		test: true
	}
))(SelectionBox)