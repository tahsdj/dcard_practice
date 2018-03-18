import {_onLiveVideo, getSinglePost, _updateVideoState,updatePlayList} from 'api/posts.js'
import {_fetchYoutubeData} from 'api/video.js'

let videoInit = {
	currentVideoTime: 0,
	isEditor: false,
	stop: false,
	videoId: '',
	videoKey: '',
	loadedSuccess: false,
	restTime: 90
}


export function updateVideoTime(s,vid,vkey,editor=false,restTime) {

	return {
		type: '@VIDEO/UPDATE_TIME',
		currentVideoTime: s,
		isEditor: editor,
		videoId: vid,
		videoKey: vkey,
		restTime: restTime
	}
}

export function updateVideo(s,vid,vkey,stop,editor=false,playList,restTime) {
	//playList = playList.splice(0,1)
	return (dispatch, state) => {
		let status = {
			time: s,
			vid: vid,
			stop: stop,
			playList: playList.length===0? 0: playList,
			restTime: restTime
		}
		//console.log('updating...................................')
		_updateVideoState(vkey,status).then(data=>{
			dispatch(updateVideoEnd(data,vkey))
			dispatch(updatePlayListEnd(data.playList,0))
		})
	}
}

export function updateVideoEnd(state,vkey) {
	return {
		type: '@VIDEO/UPDATE_END',
		currentVideoTime: state.time,
		isEditor: false,
		videoId: state.vid,
		stop: false,
		videoKey: vkey,
		restTime: state.restTime
	}
}


export function loadVideoData(key){
	return (dispatch, state) => {
		getSinglePost(key).then( data => {
			dispatch(loadVideoDataEnd(data,key))
			dispatch(loadPlayListEnd(data))
		})
	}
}

export function loadVideoDataEnd(data,vkey) {
	return {
		type: '@VIDEO/LOAD_END',
		currentVideoTime: data.currentVideoTime,
		isEditor: false,
		videoKey: vkey,
		videoId: data.videoId,
		stop: data.stop,
		restTime: data.restTime
	}
}

export function changeVideo(vid,vkey,playListIndex,playList) {
	//console.log('changeVideo id: '+ vid)
	
	/*
	return (dispatch, state) => {
		dispatch(videoChangeEnd(vid,vkey))
		//dispatch(updatePlayListEnd(playList,playListIndex))
	}*/
	return {
		type: '@VIDEO/CHANGE',
		videoId: vid,
		videoKey: vkey
	}
}

function videoChangeEnd(vid,vkey) {
	//console.log('......................')
	return {
		type: '@VIDEO/CHANGE',
		videoId: vid,
		videoKey: vkey
	}
}


export function onUpdateVideo(content,vkey,playList) {
	//if ( content.restTime <= 1 && playList.length >==)
	return {
		type: '@VIDEO/ON_UPDATE',
		videoKey: vkey,
		currentVideoTime: content.currentVideoTime,
		videoId: content.videoId,
		restTime: content.restTime
	}
}


export function videoLive(state=videoInit,action) {
	switch (action.type) {
		case '@VIDEO/UPDATE_TIME':
			return {
				currentVideoTime: action.currentVideoTime,
				isEditor: action.isEditor,
				videoId: action.videoId,
				stop: false,
				videoKey: action.videoKey,
				loadedSuccess: true
			}
		case '@VIDEO/CHANGE':
			return {
				currentVideoTime: 0,
				isEditor: true,
				videoId: action.videoId,
				stop: false,
				videoKey: action.videoKey,
				loadedSuccess: true,
				restTime: 90
			}
		case '@VIDEO/ON_UPDATE':
			return {
				currentVideoTime: action.currentVideoTime,
				isEditor: false,
				videoId: action.videoId,
				stop: false,
				videoKey: action.videoKey,
				loadedSuccess: true,
				restTime: action.restTime
			}
		case '@VIDEO/LOAD_END':
			return {
				currentVideoTime: action.currentVideoTime,
				isEditor: action.isEditor,
				videoId: action.videoId,
				stop: action.stop,
				videoKey: action.videoKey,
				loadedSuccess: true,
				restTime: action.restTime
			}
		case '@VIDEO/UPDATE_END':
			return {
				currentVideoTime: action.currentVideoTime,
				isEditor: action.isEditor,
				videoId: action.videoId,
				stop: action.stop,
				videoKey: action.videoKey,
				loadedSuccess: true,
				restTime: action.restTime
			}
		default:
			return state
	}
}


let videoPlayListInit = {
	playList: [
	],
	playListCurrentIndex: 0
}

function loadPlayListEnd(data) {
	if (data.playList) {
		return {
			type: '@PLAYLIST/LOAD_END',
			playList: data.playList
		}
	}else {
		return {
			type: '@PLAYLIST/LOAD_NO_UPDATE',
			playList: []
		}
	}
}

export function getYoutubeData(vid,playList,nowVidex,key) {
	return (dispatch,state)=>{
		const API_KEY = 'AIzaSyBG55O4on3iYR5O197diBsna1g0eNE4YB8'
		let gUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + vid + "&key=" + API_KEY + "&part=snippet,statistics,contentDetails"
		fetch(gUrl,{method: 'get'})
			.then( response=> response.json())
			.then( data => {
				let d = new Date()
				let nowTime = d.getTime()
				let month = d.getMonth()
				let date = d.getDate()
				let hour = d.getHours()
				let minutes = d.getMinutes()
				let content = {
					user: '訪客',
					videoId: vid,
					time: `${month+1}月${date}日 ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`,
					title: data["items"][0]["snippet"]["title"],
					videoImage: data["items"][0]["snippet"]["thumbnails"]["default"]["url"]
				}
				playList = [...playList,content]
				dispatch(getYoutubeDataEnd(playList,nowVidex))
				updatePlayList(key,playList).then( res => {
					dispatch(getYoutubeDataEnd(res,nowVidex))
				})
			})
	}
}

function getYoutubeDataEnd(playList,nowVidex) {
	return {
		type: '@PLAYLIST/GET_DATA_END',
		playList: playList,
		playListCurrentIndex: nowVidex
	}
}


export function removePlayListVideo(removeIndex=0,playList,nowIndex=0,key) {
	playList = playList.splice(removeIndex,1) //remove first video
	return (dispatch, state) => {
		updatePlayList(key,playList).then( res => {
			dispatch(updatePlayListEnd(playList,nowIndex))
		})
	}
}

export function playNext(s,vid,vkey,stop,editor=false,playList) {
	playList.splice(0,1)
	return (dispatch, state) => {
		let status = {
			time: s,
			vid: vid,
			stop: stop,
			playList: playList.length===0? 0: playList,
			restTime: 90
		}
		//console.log('updating...................................')
		_updateVideoState(vkey,status).then(data=>{
			dispatch(updateVideoEnd(data,vkey))
			dispatch(updatePlayListEnd(data.playList,0))
		})
	}
}

function updatePlayListEnd(playList,nowIndex) {
	return {
		type: '@PLAYLIST/REMOVE_VIDEO',
		playList: playList===0? []: playList,
		playListCurrentIndex: nowIndex
	}
}

export function playList(state=videoPlayListInit,action) {
	switch (action.type) {
		case '@PLAYLIST/GET_DATA_END':
			return {
				playList: action.playList,
				playListCurrentIndex: action.playListCurrentIndex
			}
		case '@PLAYLIST/REMOVE_VIDEO':
			return {
				playList: action.playList,
				playListCurrentIndex: action.playListCurrentIndex
			}
		case '@PLAYLIST/LOAD_END':
			return {
				playList: action.playList,
				playListCurrentIndex: 0
			}
		case '@PLAYLIST/LOAD_NO_UPDATE':
			return {
				playList: action.playList,
				playListCurrentIndex: 0
			}
		default:
			return state
	}
}