# Phoenix Learning
Teach your kids to read and spell with this learning game.
Originally for my son, free for anyone to use.

## About
This project was to help my son learn to read. I found that all the other learning games we tried were very addictive and not repetitive enough.
The idea behind Phoenix Learning is to hold the child's hand at first by making them spell the word on their own a few times. Then we ask them to spell 
the word on their own. If they spell the word on their own correctly they get a point. If they can not, they can go back and practice the word more until they can.
Parents can set a points win condition, and when it's met, the app will play a Youtube video of the parents choice. 
The video will only play once, and will be non clickable except for pause. 

- Choose between categories of words or sort by length.
- Set win conditions and play a video after points achieved.
- Audio and visual cues to help guide children through the app.
- Play online or with an Android phone. 
- Be amazed when your child can spell so many words in a short period of time.

## Play Phoenix Learning
- Go to https://phoenix.draigan.com to play online.
- Better yet, if you have android, download the APK and install.
- [Phoenix Learning APK ](https://file.io/TMsjB2pvZ6mM) 
-Just make sure you allow installation from unknown sources when installing. I recommend the app if you have android because it doesn't have distracting buttons on it like a browser does.

## Development 
- Clone this directory https://github.com/Draigan/phoenix

### Client
Install node packages 
```
npm install
```
Navigate to /client/src/redux/slices/dataSlice.tsx and change the backendURL to the URL of your python server.
```
const backendURL = 'YOUR-URL-HERE';
```
Run the client
```
npm run dev
```

Enjoy!
