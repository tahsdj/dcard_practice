

let notificationInit = {
	iconClicked: false
}

export function clickIcon() {
	return {
		type: '@ICON/CLICKED',
		iconClicked: true
	}
}

export function unClickIcon() {
	return {
		type: '@ICON/UNCLICKED',
		iconClicked: false
	}
}

export function notification(state=notificationInit,action) {
	switch(action.type) {
		case '@ICON/CLICKED':
			return {
				iconClicked: action.iconClicked
			}
		case '@ICON/UNCLICKED':
			return {
				iconClicked: action.iconClicked
			}
		default:
			return state
	}
}