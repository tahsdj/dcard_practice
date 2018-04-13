## Dlive

A new idea that we can share youtube videos on Dcard and watch together in the same time. (Wathcing serial posts is another idea. Ex: reading comics)

### Example

* link: https://drrr-7cacb.firebaseapp.com/ 

### Installation

* Clone this repository to your local directory.

```
git clone ............
```
* Install modules
```
npm install 
```
* Remember to change to your firebase configure if you want to use database in src/api/posts.js file
```
import firebase from 'firebase'

var config = {
    apiKey: "AIzaXXXXXvROMXXXXXXXXXXXXXX6MHz56Y",
    authDomain: "XXXXXX.firebaseapp.com",
    databaseURL: "https://XXXXX.firebaseio.com",
    projectId: "XXXXXXX",
    storageBucket: "XXXXX.appspot.com",
    messagingSenderId: "XXXX10952228"
  }
 
 firebase.initializeApp(config)

 const postsRef = firebase.database().ref('/posts')

```

### Framework & tools
#### JS
* React + Redux
#### CSS
* Sass
#### Others
* Webpack
* Youtube api
* Firebase

### Function

Enter the url of youtube here
![](https://i.imgur.com/fEsxbx7.png)

And video will show in the playlist
![](https://i.imgur.com/8uwovxE.png)

Each video is default to play only 90 seconds, so if you to keep listening, remember to press the button below to extend the time. 
![](https://i.imgur.com/ct4JxMg.png)
