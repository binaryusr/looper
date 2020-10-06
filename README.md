# Looper extension

## Description
- Chrome extension for looping over a fragment of a video with web components

## Goals
Figure out:
- how native web components work
- how to create browser extension

## Notes
- A lot of direct DOM manipulation because planned as extension

## Extensions
- [How too make chrome extension](https://thoughtbot.com/blog/how-to-make-a-chrome-extension)
- [Insert code into the page using `content.js`](https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script)

## Video player
- [Entire custom video player](https://www.creativebloq.com/html5/build-custom-html5-video-player-9134473)
- [Progress bars in depth](http://www.useragentman.com/blog/2012/01/03/cross-browser-html5-progress-bars-in-depth/)
- [CSS tricks about progress element](https://css-tricks.com/html5-progress-element/)
- [Video player styling, MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics)
- [Video and audio API, MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs)

## How to build an extension
- create `manifest.json`
- load an unpacked extension to chrome (for development purposes)
- `content.js` can interact with web pages that the browser visits
- `background.js` has an access to all chrome APIs
- `contetn.js` and `background.js` can only interact with each other through
message passing 
