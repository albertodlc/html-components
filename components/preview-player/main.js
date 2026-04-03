import { VideoPlayer } from "./components.js";

if( !customElements.get('video-player') ){
    customElements.define('video-player', VideoPlayer);
}