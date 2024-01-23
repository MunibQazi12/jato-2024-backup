import QuoteBlock from "@/components/Award/Award/StructuredTextBlocks/QuoteBlock";
import {
    isBlockquote,
    isHeading,
    isLink,
    isParagraph,
} from "datocms-structured-text-utils";
import {
    Image as DatoImage,
    StructuredText,
    renderNodeRule,
} from "react-datocms";
import NewsletterCTABlock from "@/components/Award/Award/StructuredTextBlocks/NewsletterCTABlock";
import CTABlock from "@/components/Award/Award/StructuredTextBlocks/CTABlock";

import Link from "next/link";
import {
    AppCtaRecord,
    CtaButtonWithImageRecord,
    ImageBlockRecord,
    GalleryRecord,
    NewsletterSubscriptionRecord,
    AwardRecord,
    SiteLocale,
    MuxVideoRecord,
} from "@/graphql/generated";
import Highlighter from "@/components/Common/Highlighter";
import CTAAppBlock from "./CTAAppBlock";
import GalleryBlock from "./GalleryBlock";
import MUXplayer from "@/components/Home/MUXliveStream/MuxPlayer";


type Props = {
    data: any;
    lng: SiteLocale;
};

const StructuredTextSection = ({ data, lng }: Props) => {


    return (
        <StructuredText
            data={data}
            renderNode={Highlighter}
            renderBlock={({ record }: any) => {
                switch (record.__typename) {
                    case "ImageBlockRecord":
                        const ImageBlockRecord = record as ImageBlockRecord;
                        return (
                            <div className="relative mb-16 mt-16 overflow-hidden rounded-md shadow-md sm:h-[300px] md:h-[400px]">
                                <DatoImage
                                    data={ImageBlockRecord.image.responsiveImage}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="50% 50%"
                                />
                            </div>
                        );
                    case "GalleryRecord":
                        const galleryRecord = record as GalleryRecord;
                        return (
                            <GalleryBlock galleryRecords={[galleryRecord]} />
                        );
                    case "NewsletterSubscriptionRecord":
                        const NewsletterSubscriptionRecord =
                            record as NewsletterSubscriptionRecord;
                        return (
                            <NewsletterCTABlock
                                title={NewsletterSubscriptionRecord.title}
                                subtitle={NewsletterSubscriptionRecord.subtitle}
                                buttonLabel={
                                    NewsletterSubscriptionRecord.buttonLabel
                                }
                            />
                        );
                    case "CtaButtonWithImageRecord":
                        const CtaButtonWithImageRecord =
                            record as CtaButtonWithImageRecord;
                        return (
                            <CTABlock
                                title={CtaButtonWithImageRecord.title}
                                subtitle={CtaButtonWithImageRecord.subtitle}
                                buttonLabel={CtaButtonWithImageRecord.buttonLabel}
                                image={CtaButtonWithImageRecord.image}
                            />
                        );
                    case "AppCtaRecord":
                        const appCtaRecord = record as AppCtaRecord;
                        return (
                            <CTAAppBlock
                                title={appCtaRecord.title}
                                text={appCtaRecord.text}
                                googleURL={appCtaRecord.googlePlayUrl}
                                appleURL={appCtaRecord.appstoreUrl}
                            />
                        );
                    case "MuxVideoRecord":
                        const MuxVideoRecord = record as MuxVideoRecord;
                        return (
                            <div className="relative overflow-hidden">
                                <MUXplayer
                                    streamType={MuxVideoRecord.streamType}
                                    placeholderUrl={MuxVideoRecord.placeholderUrl || ''}
                                    playbackId={MuxVideoRecord.playbackId}
                                />
                            </div>
                        );
                    default:
                        return null;
                }
            }}
            renderLinkToRecord={({
                record,
                children,
                transformedMeta,
            }) => {
                switch (record.__typename) {
                    case "AwardRecord":
                        return (
                            <Link
                                {...transformedMeta}
                                href={`/${lng}/awards/${record.slug}`}
                                className="text-base font-medium leading-relaxed text-body-color underline sm:text-lg sm:leading-relaxed"
                            >
                                {children}
                            </Link>
                        );
                    default:
                        return null;
                }
            }}
            renderInlineRecord={({ record }) => {
                switch (record.__typename) {
                    case "AwardRecord":
                        const AwardRecord = record as AwardRecord;
                        return (
                            <Link
                                key={AwardRecord.id}
                                href={`/${lng}/awards/${record.slug}`}
                                className="underline"
                            >
                                {AwardRecord.title}
                            </Link>
                        );
                    default:
                        return null;
                }
            }}
            customNodeRules={[
                renderNodeRule(isHeading, ({ children, key }) => {
                    return (
                        <h3
                            className="mb-4 mt-6 text-xl font-bold text-black dark:text-darktext sm:text-2xl lg:text-xl xl:text-2xl"
                            key={key}
                        >
                            {children}
                        </h3>
                    );
                }),
                renderNodeRule(isParagraph, ({ children, key }) => {
                    return (
                        <p
                            className="dark:text-darktext"
                            key={key}
                        >
                            {children}
                        </p>
                    );
                }),
                renderNodeRule(isLink, ({ node, children, key }) => {
                    const attributeObject =
                        node.meta?.reduce((acc: any, { id, value }) => {
                            acc[id] = value;
                            return acc;
                        }, {}) || {};

                    return (
                        <Link
                            className="text-base font-medium leading-relaxed text-body-color underline sm:text-lg sm:leading-relaxed"
                            href={node.url}
                            key={key}
                            {...attributeObject}
                        >
                            {children}
                        </Link>
                    );
                }),
                renderNodeRule(isBlockquote, ({ children, key }) => {
                    return <QuoteBlock text={children} />;
                }),
            ]}
        />
    );
}

export default StructuredTextSection;