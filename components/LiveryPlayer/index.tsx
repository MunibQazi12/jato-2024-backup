'use client'
import { FC, useEffect } from "react";

type Props = {
    streamId: string;
}

// test stream id : 5ddb98f5e4b0937e6a4507f2
const LiveryPlayer: FC<Props> = ({streamId}) => {

    useEffect(
        () => {
            import('@liveryvideo/player');
        }, []);
        
    return <livery-player streamid={streamId}></livery-player>;

}

export default LiveryPlayer;
