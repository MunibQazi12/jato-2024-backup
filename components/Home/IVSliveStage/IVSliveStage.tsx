import { IvsLiveStageRecord } from "@/graphql/generated";
import IVSplayer from "./IVSplayer";


type Props = {
    ivsLiveStageRecord: IvsLiveStageRecord;
};

const IVSliveStage = ({
    ivsLiveStageRecord
}: Props) => {

    const {
        rtmpUrl,
        iframeHeight,
        iframeUrl,
        iframeWidth
    } = ivsLiveStageRecord;

    return (
        <section
            id="IVSplayer"
            className="bg-primary/[.03] pt-24 pb-10 dark:bg-dark-background opacity-95 min-h-[calc(100vh-320px)]"
        >
            <div className="container">
                <div className="flex lg:flex-row flex-col h-[90vh]">
                    <div className="lg:w-[66.66%] w-full">
                        <IVSplayer playbackURL={rtmpUrl} />
                    </div>
                    <div className="lg:w-[33.33%] w-full lg:h-auto h-[565px]">
                        <iframe
                            src={iframeUrl}
                            height={`${iframeHeight}px`}
                            width={`${iframeWidth}px`}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default IVSliveStage;