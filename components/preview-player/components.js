import { startPreview, resetPreview } from "./utils/videoUtils.js";
import { Hls } from './external/hls/hls.mjs'

export class VideoPlayer extends HTMLElement {
    #url = null;
    #poster = null;
    #previewTimeout = null;
    #isHls = false;

    constructor() {
        super();
        this.#url = this.getAttribute('c-url') || "";
        this.#poster = this.getAttribute('c-poster') || "";
    }

    handleEvent(event) {
        if (event.type == 'mouseenter') {
            const videoPlayer = this.querySelector('video');
            const { timeoutId, currentPoster } = startPreview({ video: videoPlayer });

            this.#poster = currentPoster;
            this.#previewTimeout = timeoutId;

        } else if (event.type == 'mouseleave') {
            const videoPlayer = this.querySelector('video');
            // resetPreview({ video: videoPlayer, timeoutId: this.#previewTimeout });
            this.render();
        } else if (event.type == 'click') {
            console.log("clicked");
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.#url?.includes('.m3u8')) {
            this.#isHls = true;

            this.innerHTML = `
                <video disablePictureInPicture width="300">
                    <source src="${this.#url}" type="video/mp4">
                    Your browser does not support HTML video.
                </video>`;
        } else {
            this.innerHTML = `
            <video disablePictureInPicture width="300" ${this.#poster ? 'poster="' + this.#poster + '"' : ''}>
                <source src="${this.#url}" type="video/mp4">
                Your browser does not support HTML video.
            </video>`;
        }

        this.addEventListener('mouseenter', this);
        this.addEventListener('mouseleave', this);
        this.addEventListener('click', this);

        if( this.#isHls ){
            this.#enableHlsVideo();
        }
    }

    #enableHlsVideo(){
        const video = this.querySelector('video');
        const videoSrc = this.#url;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            // hls.on(Hls.Events.MANIFEST_PARSED, function () {
            //     video.play();
            // });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // This is for Safari and other browsers that support HLS natively
            video.src = videoSrc;
            // video.addEventListener('loadedmetadata', function () {
            //     video.play();
            // });
        } else {
            console.error('HLS is not supported in this browser.');
        }
    }
}