import { IframeBlockRecord } from "@/graphql/generated";

type Props = {
    iframeBlock: IframeBlockRecord;
};

const IframeBlock = ({
    iframeBlock
}: Props) => {

    const {
        iframeUrl,
        width,
        height,
        minHeight,
        minHeightDimensionUnit,
        heightDimensionUnit,
        widthDimensionUnit
    } = iframeBlock;

    return (
        <section
            id="IframeBlock"
            className="dark:bg-dark-background min-h-[calc(100vh-320px)]"
        >
            <div className="container">
                <iframe
                    src={iframeUrl}
                    width={`${width}${widthDimensionUnit}`}
                    height={`${height}${heightDimensionUnit}`}
                    style={{
                        width: `${width}${widthDimensionUnit}`,
                        height: `${height}${heightDimensionUnit}`,
                        minHeight: `${minHeight}${minHeightDimensionUnit}`
                    }}
                ></iframe>
            </div>
        </section>
    );
}

export default IframeBlock;