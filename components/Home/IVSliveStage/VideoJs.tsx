'use client'
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {
    registerIVSQualityPlugin,
    registerIVSTech,
} from 'amazon-ivs-player';

interface Props {
    options: any;
    onReady: any;
}

export const VideoJS = ({ options, onReady }: Props) => {
    const videoRef = useRef<any>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {

        if (!playerRef.current) {

            registerIVSTech(videojs, {
                wasmBinary: '/amazon-ivs-wasmworker.min.wasm',
                wasmWorker: '/amazon-ivs-wasmworker.min.js',
            });
            registerIVSQualityPlugin(videojs);

            const videoElement = document?.createElement("video-js");

            videoElement?.classList?.add('vjs-big-play-centered');
            videoRef?.current?.appendChild(videoElement);

            const player: any = playerRef.current = videojs(videoElement, {
                techOrder: ["AmazonIVS"],
                ...options,
                controlBar: {
                    volumePanel: {
                        inline: false,
                    }
                }
            }, () => {
                player.autoplay(options?.autoplay);
                player.src(options?.sources);
                onReady && onReady(player);
            });

        } else {
            const player = playerRef?.current;

            player.autoplay(options?.autoplay);
            player.src(options?.sources);
        }
    }, [options, videoRef, onReady]);

    return (
        <div data-vjs-player>
            <div id="myVideo" ref={videoRef} />
        </div>
    );
}

export default VideoJS;