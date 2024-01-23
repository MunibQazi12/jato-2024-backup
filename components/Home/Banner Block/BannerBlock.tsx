import { BannerBlockRecord } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";

type Props = {
    bannerBlock: BannerBlockRecord;
};

const BannerBlock = ({
    bannerBlock
}: Props) => {

    const {
        width,
        height,
        minHeight,
        minHeightDimensionUnit,
        heightDimensionUnit,
        widthDimensionUnit,
        bannerImage,
        bannerUrl,
        objectFit,
        layout
    } = bannerBlock;

    const widthWithUnit = `${width}${widthDimensionUnit}`;
    const heightWithUnit = `${height}${heightDimensionUnit}`;
    const minHeightWithUnit = `${minHeight}${minHeightDimensionUnit}`;

    return (
        <section
            id="BannerBlock"
            className="dark:bg-dark-background min-h-[calc(100vh-320px)]"
        >
            <div className="container">
                <Link href={bannerUrl}>
                    <div
                        className={`relative overflow-hidden rounded-md shadow-md h-[35vh] sm:h-[50vh] lg:h-[${heightWithUnit}] w-[${widthWithUnit}] min-h-[${minHeightWithUnit}]`}
                    >
                        <DatoImage
                            data={bannerImage.responsiveImage}
                            layout={layout as any}
                            objectFit={objectFit as any}
                            objectPosition="50% 50%"
                        />
                    </div>
                </Link>
            </div>
        </section>
    );
}

export default BannerBlock;