export function startPreview({video}){
    let currentPoster = null;
    if( video.poster ){
        currentPoster = video.poster;
        video.poster = '';
    }

    let duration = Math.round(video.duration);
    let previewDuration = Math.round((duration/4) * 1000);

    video.muted = true;
    video.currentTime = Math.round(duration/2);
    video.playbackRate = 0.5;
    video.play();

    // Timeout ID
    const timeoutId = setTimeout(() => {
        startPreview({video: video});
    }, previewDuration);

    return {
        currentPoster,
        timeoutId
    }
}

export function resetPreview({video, timeoutId, poster = null}){
    clearTimeout(timeoutId);
    
    let duration = video.duration;

    video.pause();
    video.currentTime = Math.round(duration/2);

    if( poster ){
        video.poster = poster;
    }
}