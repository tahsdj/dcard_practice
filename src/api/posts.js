//import 'babel-poly-fill'
import firebase from 'firebase'

// put your individual config code
var config = {
    apiKey: "AIzaSyXXXIOXXXXXXXAo3XXXHq4UPXD5Mkz56Y",
    authDomain: "XXXXX.firebaseapp.com",
    databaseURL: "https://XXX.firebaseio.com",
    projectId: "drXXXXacb",
    storageBucket: "drrrXXXX.appspot.com",
    messagingSenderId: "105XXXX952228"
  }
 
 firebase.initializeApp(config)

 const postsRef = firebase.database().ref('/posts')


export function listPosts() {
 	return new Promise( (resolve, reject) => {
 		//console.log('list posts')
 		postsRef.once('value').then( data => {
 			let posts = []
 			data.forEach( d => {
 				let obj = d.val()
 				obj.key = d.key
 				posts = [...posts,obj]
 			})
 			resolve(posts)
 		})
 	})
 }

 export function getSinglePost(key) {
 	return new Promise( (resolve, reject) => {
 		postsRef.child(key).once('value').then( data => {
 			resolve(data.val())
 		})
 	})
 }

export function updatePost(key,episodes) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			episodes: episodes
		})
		resolve(episodes)
	})
}

export function updateNormalPost(key,love) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			love: love
		})
		resolve(love)
	})
}

export function addNormalComment(key,comments) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			comments: comments
		})
		resolve(comments)
	})
}

export function updatePlayList(key,playList) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			playList: playList
		})
		resolve(playList)
	})
}

export function _changeVideo(key,vid) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			videoId: vid
		})
		resolve(vid)
	})
}

export function _updateVideoState(key,state) {
	return new Promise( (resolve, reject) => {
		postsRef.child(key).update({
			videoId: state.vid,
			currentVideoTime: state.time,
			stop: state.stop,
			playList: state.playList,
			restTime: state.restTime
		})
		resolve(state)
	})
}

export function _onLiveVideo(callback) {
	//let key = 'L7_SLOynNXAAzU8tbMj'
	return postsRef.on('child_changed', data =>{
		//console.log('updated data: ' + data.val())
		callback(data.val(),data.key)
	})
}


export function postPost(content={}) {
	content = {
			userName: '系統每日隨便推薦',
			name: '進擊的巨人',
			category: 2, //2 for text live 
			imageUrl: 'images/attack-on-titan.jpg',
			description: '深夜隨便談談~',
			cid: '1221',
			love: 0,
			time: '3月3日 14:52',
			episodes: [
			],
			comments: [
				{
					school: '成功大學',
					comment: '留言終結者',
					time: '3月3日 14:52'
				},
				{
					school: '成功大中小學',
					comment: '留言中結者',
					time: '3月3日 14:52'
				}
			]
		}
	return new Promise( (resolve, reject) => {
		postsRef.push(content).then( ()=> resolve(content))
	})
}