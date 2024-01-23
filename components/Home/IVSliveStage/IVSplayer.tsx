'use client'
import VideoJS from "./VideoJs";
import videojs from 'video.js';
import { useCallback, useRef } from "react";
import {
    registerIVSQualityPlugin,
} from 'amazon-ivs-player';

type Props = {
    playbackURL: string
}

const IVSplayer = ({ playbackURL }: Props) => {

    const playerRef = useRef<any>(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        playinline: true,
        fluid: true,
        sources: [{
            src: playbackURL
        }]
    };

    const muteHandler = () => {
        const isMuted = playerRef.current.muted();
        playerRef.current.muted(!isMuted);
        const el = document.getElementById('audioControl');
        if (el) {
            el.innerText = !isMuted ? 'Unmute' : 'Mute'
        }
    }

    const handlePlayerReady = useCallback((player: any) => {
        playerRef.current = player;
        registerIVSQualityPlugin(videojs);
        player.enableIVSQualityPlugin();
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    }, [playerRef]);

    return (
        <div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <div className="w-full flex justify-center items-center">
                <button
                    id="audioControl"
                    type="button"
                    onClick={muteHandler}
                    className="py-2.5 w-24 h-12 px-5 bg-primary text-[#fff] rounded my-2 cursor-pointer"
                >
                    {'Unmute'}
                </button>
            </div>
        </div>
    );
};

export default IVSplayer;
