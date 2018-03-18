import {listPosts, updatePost, addNormalComment, updateNormalPost} from 'api/posts.js'



export function getPostsData() {
	//console.log('hello world')
	return (dispatch,state) => {
		listPosts().then( data => {
			dispatch(fetchDataEnd(data))
		})
		dispatch(fetchDataStart())
	}
}

function fetchDataStart() {
	//console.log('fetch start')
	return {
		type: '@POST/FETCH_START',
	}
}

function fetchDataEnd(data) {
	//console.log('fetch data: '+ data)
	return {
		type: '@POST/FETCH_END',
		posts: data
	}
}

export function clickPost(pid,ep,posts) {
	console.log('posts: '+posts)
	return {
		type: '@POST/CLICK',
		posts: posts,
		nowPost: pid,
		nowEp: ep
	}
}

export function closePost(posts) {

	return {
		type: '@POST/CLOSE',
		posts: posts
	}
}

export function changePostPage(nowPost,nowEp,i,posts) {
	return {
		type: '@POST/CHANGE',
		posts: posts,
		nowPost: nowPost,
		nowEp: nowEp + i
	}
}

export function addComment(nowPost,nowEp,content,posts) {
	switch (posts[nowPost].category){
		case 1:
			if ( posts[nowPost].episodes[nowEp].comments ) posts[nowPost].episodes[nowEp].comments = [...posts[nowPost].episodes[nowEp].comments,content]
			else posts[nowPost].episodes[nowEp].comments = [content]
			return (dispatch, state) => {
				updatePost(posts[nowPost].key,posts[nowPost].episodes).then((episodes)=>dispatch(addCommentSuccess(posts,nowPost,nowEp,episodes)))
				dispatch(addPostStart(nowPost,nowEp,posts))
			}
		
		case 2:
			posts[nowPost].comments = [...posts[nowPost].comments, content]
			return (dispatch, state) => {
				addNormalComment(posts[nowPost].key, posts[nowPost].comments).then(comments=>dispatch(addNormalCommentSuccess(posts,nowPost,nowEp,comments)))
			}
	}
	//updatePost(posts[nowPost].key,posts[nowPost].episodes[nowEp].comments)
	/*
	return {
		type: '@POST/ADD_COMMENT',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
	*/
}

function addPostStart(nowPost,nowEp,posts) {
	return {
		type: '@POST/ADD_COMMENT_START',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

function addCommentSuccess(posts,nowPost,nowEp,episodes) {
	posts[nowPost].episodes = episodes
	return {
		type: '@POST/ADD_COMMENT_SUCCESS',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

function addNormalCommentSuccess(posts,nowPost,nowEp,comments) {
	posts[nowPost].comments = comments
	return {
		type: '@POST/ADD_COMMENT_SUCCESS',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

export function lovePost(nowPost,nowEp,posts) {
	switch (posts[nowPost].category) {
		case 1:
			posts[nowPost].episodes[nowEp].love += 1
			return ( dispatch, state) => {
				updatePost(posts[nowPost].key, posts[nowPost].episodes).then((episodes)=>dispatch(lovePostEnd(posts,nowPost,nowEp,episodes)))
				dispatch(lovePostStart(nowPost,nowEp,posts))
			}
		case 2: 
			posts[nowPost].love += 1
			return (dispatch, state) => {
				updateNormalPost(posts[nowPost].key, posts[nowPost].love).then((loves)=>dispatch(loveNormalPostEnd(posts,nowPost,nowEp,loves)))
				dispatch(lovePostStart(nowPost,nowEp,posts))
			}
	}
}


function lovePostStart(nowPost,nowEp,posts) {
	return {
		type: '@POST/LOVE_POST_START',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

function loveNormalPostEnd(posts,nowPost,nowEp,love) {
	posts[nowPost].love = love
	return {
		type: '@POST/LOVE_POST_SUCCESS',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

function lovePostEnd(posts,nowPost,nowEp,episodes) {
	posts[nowPost].episodes = episodes
	return {
		type: '@POST/LOVE_POST_SUCCESS',
		nowPost: nowPost,
		nowEp: nowEp,
		posts: posts
	}
}

let initPostState = {
	clicked: false,
	posts: [

	],
	nowPost: 0,
	nowEp: 0,
	loading: false
}

export function posts(state=initPostState, action) {
	switch(action.type) {
		case '@POST/CLICK':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		case '@POST/CLOSE':
			return {
				clicked: false,
				posts: action.posts,
				nowPost: 0,
				nowEp: 0,
				loading: false
			}
		case '@POST/CHANGE':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		case '@POST/ADD_COMMENT_START':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		case '@POST/ADD_COMMENT_SUCCESS':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		case '@POST/FETCH_START':
			return  {
				clicked: false,
				posts: [],
				nowPost: 0,
				nowEp: 0,
				loading: true
			}

		case '@POST/FETCH_END':
			return {
				clicked: false,
				posts: action.posts,
				nowPost: 0,
				nowEp: 0,
				loading: false
			}
		case '@POST/LOVE_POST_START':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		case '@POST/LOVE_POST_SUCCESS':
			return {
				clicked: true,
				posts: action.posts,
				nowPost: action.nowPost,
				nowEp: action.nowEp,
				loading: false
			}
		default:
			return state
	}
}





let initScroll = {
	interval: 0
}

export function changeScroll(interval) {
	//console.log('action: '+ interval)
	return {
		type: 'SCROLL/CHANGE',
		interval: interval
	}
}

export function scroll(state=initScroll, action) {
	switch(action.type) {
		case 'SCROLL/CHANGE':
			return {
				interval: action.interval
			}
		default:
			return state
	}
}


/*
{
			userName: '系統每日隨便推薦',
			category: 1, //0: normal post, 1: episode posts
			name: '海賊王',
			imageUrl: 'images/one-piece.jpg',
			description: '主角是一個橡膠果實的能力者，目標是成為海賊王',
			cid: '1152',
			love: 0,
			time: '3月3日 14:52',
			episodes: [
				{
					ep: 896,
					pages: 15,
					love: 0,
					comments: []
				},
				{
					ep: 895,
					pages: 15,
					love: 0,
					comments: [
						{
							school: '成功大學',
							comment: '留言終結者',
							time: '3月3日 14:52'
						},
					]
				},
				{
					ep: 894,
					pages: 16,
					love: 0,
					comments: []
				},
				{
					ep: 893,
					pages: 17,
					love: 0,
					comments: []
				},
				{
					ep: 892,
					pages: 16,
					love: 0,
					comments: []
				},
				{
					ep: 891,
					pages: 15,
					comments: []
				},
				{
					ep: 890,
					pages: 16,
					love: 0,
					comments: []
				},
				{
					ep: 889,
					pages: 16,
					love: 0,
					comments: []
				},
				{
					ep: 888,
					pages: 15,
					love: 0,
					comments: []
				}


*/