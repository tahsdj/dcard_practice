
const API_KEY = 'AIzaSyBG55O4on3iYR5O197diBsna1g0eNE4YB8'

export function _fetchYoutubeData(vid) {
	let gUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + vid + "&key=" + API_KEY + "&part=snippet,statistics,contentDetails";
	return fetch(gUrl,{method: 'get'})	
}