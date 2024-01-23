import Brands from "../Home/Brands";
import Features from "../Home/Features";
import Hero from "../Home/Hero";
import Pricing from "../Home/Pricing";
import Testimonials from "../Home/Testimonials";
import Video from "../Home/Video";
import DetailSection from "../Home/Detail/DetailSection";
import CompactTeam from "../About/CompactTeam";
import ExpandedTeam from "../About/ExpandedTeam";
import FAQAccordion from "../About/FAQAccordion";
import FAQGrid from "../About/FAQGrid";
import StatsSection from "../About/StatsSection";
import AboutIntro from "../About/AboutIntro";
import CompactSpeaker from "../Speakers/CompactSpeaker";
import ExpandedSpeaker from "../Speakers/ExpandedSpeaker";
import SpeakersIntro from "../Speakers/SpeakersIntro";
import {
  AboutIntroRecord,
  SpeakersIntroRecord,
  BrandSectionRecord,
  ChangelogSectionRecord,
  DetailSectionRecord,
  FaqSectionRecord,
  FeatureListSectionRecord,
  FeaturedPostsSectionRecord,
  HeroSectionRecord,
  PageModelSectionsField,
  PricingSectionRecord,
  RedirectSectionRecord,
  ReviewSectionRecord,
  SiteLocale,
  StatsSectionRecord,
  TeamSectionRecord,
  VideoSectionRecord,
  SpeakerSectionRecord,
  FeaturedAcategorySectionRecord,
  IvsLiveStageRecord,
  MuxLiveStreamRecord,
  IframeBlockRecord,
  BannerBlockRecord,
  SpacerRecord,
} from "@/graphql/generated";
import { redirect } from "next/navigation";
import GradientCards from "../Home/Pricing/GradientCards";
import Minimal from "../Home/Pricing/Minimal";
import FeatureListSelector from "../Home/Pricing/FeatureListSelector";
import SmallCards from "../Home/Pricing/SmallCards";
import Carrousel from "../Home/Testimonials/Carrousel";
import ModernCarrousel from "../Home/Testimonials/ModernCarrousel";
import MinimalCarrousel from "../Home/Testimonials/MinimalCarrousel";
import MinimalReviewCards from "../Home/Testimonials/MinimalReviewCards";
import BrandCards from "../Home/Brands/BrandCards";
import Changelog from "../Changelog";
import FeaturedAcategory from "../Home/Features Categories";
import IVSliveStage from "../Home/IVSliveStage/IVSliveStage";
import MUXliveStream from "../Home/MUXliveStream/MUXliveStream";
import IframeBlock from "../Home/Iframe Block/IframeBlock";
import BannerBlock from "../Home/Banner Block/BannerBlock";
import FeaturedPosts from "../Home/Featured Posts";
import Script from "next/script";
import Spacer from "../Common/Spacer";

type Props = {
  sections: Array<PageModelSectionsField>;
  locale: SiteLocale;
  slug?: string;
};

export default function Section({
  sections,
  locale,
  slug = '',
}: Props) {
  return (
    <div className="min-h-[calc(100vh-320px)]">
      {
        slug === 'home'
          ? <Script
            defer
            id="cookieyes"
            type="text/javascript"
            src="https://cdn-cookieyes.com/client_data/38dd9bcb9ab1dc9ac5706bcb/script.js"
          ></Script>
          : null
      }
      {sections.map((section) => {
        switch (section._modelApiKey) {
          case "spacer":
            const spacer = section as SpacerRecord;
            return (
              <Spacer
                key={section.id}
                space={spacer.space}
                extraMargin={spacer.extraMargin || null}
              />
            );
          case "changelog_section":
            const changeLogSection = section as ChangelogSectionRecord;
            return (
              <Changelog
                key={section.id}
                title={changeLogSection.title}
                subtitle={changeLogSection.subtitle}
                featuredChangeLogs={changeLogSection.featuredVersions}
                locale={locale}
              />
            );
          case "ivs_live_stage":
            const ivsLiveStageRecord = section as IvsLiveStageRecord;
            return (
              <IVSliveStage key={section.id} ivsLiveStageRecord={ivsLiveStageRecord} />
            );
          case "mux_live_stream":
            const muxLiveStreamRecord = section as MuxLiveStreamRecord;
            return (
              <MUXliveStream key={section.id} muxLiveStreamRecord={muxLiveStreamRecord} />
            );
          case "hero_section":
            const heroSectionRecord = section as HeroSectionRecord;
            return (
              <Hero
                key={section.id}
                slug={slug}
                heroSectionRecord={heroSectionRecord}
              />
            );
          case "feature_list_section":
            const featureListSectionRecord =
              section as FeatureListSectionRecord;
            return (
              <Features key={section.id} slug={slug} featureListSectionRecord={featureListSectionRecord} />
            );

          case "featured_acategory_section":
            const featureAcategorySectionRecord =
              section as FeaturedAcategorySectionRecord;
            return (
              <FeaturedAcategory
                key={section.id}
                featureAcategorySectionRecord={featureAcategorySectionRecord}
                locale={locale}
              />
            )

          case "iframe_block":
            return <IframeBlock key={section.id} iframeBlock={section as IframeBlockRecord} />

          case "banner_block":
            return <BannerBlock key={section.id} bannerBlock={section as BannerBlockRecord} />

          case "video_section":
            const videoSectionRecord = section as VideoSectionRecord;
            return (
              <Video
                key={section.id}
                videoHeader={videoSectionRecord.videoHeader}
                videoSubheader={videoSectionRecord.videoSubheader}
                videoUid={videoSectionRecord.video?.providerUid}
                videoThumbnail={videoSectionRecord.videoThumbnail}
                videoProvider={videoSectionRecord.video?.provider}
              />
            );
          case "brand_section":
            const brandSectionRecord = section as BrandSectionRecord;
            switch (brandSectionRecord.displayOptions) {
              case "brand_cards":
                return <BrandCards key={section.id} brandShowcase={brandSectionRecord.brand} />;
              default:
                return <Brands key={section.id} brandShowcase={brandSectionRecord.brand} />;
            }
          case "detail_section":
            const detailSectionRecord = section as DetailSectionRecord;
            return (
              <DetailSection
                key={section.id}
                imagePosition={detailSectionRecord.imagePosition as boolean}
                image={detailSectionRecord.image}
                details={detailSectionRecord.details}
              />
            );
          case "review_section":
            const reviewSectionRecord = section as ReviewSectionRecord;
            switch (reviewSectionRecord.displayOptions) {
              case "card_carrousel":
                return (
                  <Carrousel
                    key={section.id}
                    header={reviewSectionRecord.reviewSectionHeader}
                    subheader={reviewSectionRecord.reviewSectionSubheader}
                    reviews={reviewSectionRecord.reviews}
                  />
                );
              case "modern_carrousel":
                return (
                  <ModernCarrousel
                    key={section.id}
                    header={reviewSectionRecord.reviewSectionHeader}
                    subheader={reviewSectionRecord.reviewSectionSubheader}
                    reviews={reviewSectionRecord.reviews}
                  />
                );
              case "minimal_carrousel":
                return (
                  <MinimalCarrousel
                    key={section.id}
                    header={reviewSectionRecord.reviewSectionHeader}
                    subheader={reviewSectionRecord.reviewSectionSubheader}
                    reviews={reviewSectionRecord.reviews}
                  />
                );
              case "minimal_cards":
                return (
                  <MinimalReviewCards
                    key={section.id}
                    header={reviewSectionRecord.reviewSectionHeader}
                    subheader={reviewSectionRecord.reviewSectionSubheader}
                    reviews={reviewSectionRecord.reviews}
                  />
                );
              default:
                return (
                  <Testimonials
                    key={section.id}
                    header={reviewSectionRecord.reviewSectionHeader}
                    subheader={reviewSectionRecord.reviewSectionSubheader}
                    reviews={reviewSectionRecord.reviews}
                  />
                );
            }

          case "pricing_section":
            const pricingSectionRecord = section as PricingSectionRecord;
            switch (pricingSectionRecord.displayOption) {
              case "cards_gradient":
                return (
                  <GradientCards
                    key={section.id}
                    header={pricingSectionRecord.pricingSectionHeader}
                    subheader={pricingSectionRecord.pricingSectionSubheader}
                    plans={pricingSectionRecord.plans}
                  />
                );
              case "minimal":
                return (
                  <Minimal
                    key={section.id}
                    header={pricingSectionRecord.pricingSectionHeader}
                    subheader={pricingSectionRecord.pricingSectionSubheader}
                    plans={pricingSectionRecord.plans}
                  />
                );
              case "feature_list":
                return (
                  <FeatureListSelector
                    key={section.id}
                    header={pricingSectionRecord.pricingSectionHeader}
                    subheader={pricingSectionRecord.pricingSectionSubheader}
                    plans={pricingSectionRecord.plans}
                  />
                );
              case "mini_cards":
                return (
                  <SmallCards
                    key={section.id}
                    header={pricingSectionRecord.pricingSectionHeader}
                    subheader={pricingSectionRecord.pricingSectionSubheader}
                    plans={pricingSectionRecord.plans}
                  />
                );
              default:
                return (
                  <Pricing
                    key={section.id}
                    header={pricingSectionRecord.pricingSectionHeader}
                    subheader={pricingSectionRecord.pricingSectionSubheader}
                    plans={pricingSectionRecord.plans}
                  />
                );
            }

          case "featured_posts_section":
            return <FeaturedPosts key={section.id} locale={locale} featuredPostsSection={section as FeaturedPostsSectionRecord} />

          case "team_section":
            const teamSectionRecord = section as TeamSectionRecord;
            if (teamSectionRecord.displayOptions === "compact")
              return (
                <CompactTeam
                  key={section.id}
                  header={teamSectionRecord.title}
                  subheader={teamSectionRecord.subtitle}
                  members={teamSectionRecord.showcasedMembers}
                  lng={locale}
                />
              );
            return (
              <ExpandedTeam
                key={section.id}
                header={teamSectionRecord.title}
                subheader={teamSectionRecord.subtitle}
                members={teamSectionRecord.showcasedMembers}
                lng={locale}
              />
            );
          case "speaker_section":
            const speakerSectionRecord = section as SpeakerSectionRecord;
            if (speakerSectionRecord.displayOptions === "compact")
              return (
                <CompactSpeaker
                  key={section.id}
                  header={speakerSectionRecord.title}
                  subheader={speakerSectionRecord.subtitle}
                  speakersSection={speakerSectionRecord.showcasedSpeakers}
                  lng={locale}
                />
              );
            return (
              <ExpandedSpeaker
                key={section.id}
                header={speakerSectionRecord.title}
                subheader={speakerSectionRecord.subtitle}
                speakersSection={speakerSectionRecord.showcasedSpeakers}
                lng={locale}
              />
            );
          case "faq_section":
            const faqSectionRecord = section as FaqSectionRecord;
            if (faqSectionRecord.displayOptions === "accordion")
              return (
                <FAQAccordion
                  key={section.id}
                  title={faqSectionRecord.title}
                  subtitle={faqSectionRecord.subtitle}
                  questions={faqSectionRecord.questions}
                />
              );
            return (
              <FAQGrid
                key={section.id}
                title={faqSectionRecord.title}
                subtitle={faqSectionRecord.subtitle}
                questions={faqSectionRecord.questions}
              />
            );
          case "stats_section":
            const statsSectionRecord = section as StatsSectionRecord;
            return (
              <StatsSection
                key={section.id}
                title={statsSectionRecord.title}
                subtitle={statsSectionRecord.subtitle}
                statistic={statsSectionRecord.statistic}
              />
            );
          case "about_intro":
            const aboutIntroSectionRecord = section as AboutIntroRecord;
            return (
              <AboutIntro
                key={section.id}
                header={aboutIntroSectionRecord.header}
                subheader={aboutIntroSectionRecord.subheader}
                introduction={aboutIntroSectionRecord.introductionText}
                images={aboutIntroSectionRecord.images}
                preHeader={aboutIntroSectionRecord.preHeader}
              />
            );
          case "speakers_intro":
            const speakersIntroSectionRecord = section as SpeakersIntroRecord;
            return (
              <SpeakersIntro
                key={section.id}
                header={speakersIntroSectionRecord.header}
                subheader={speakersIntroSectionRecord.subheader}
                introduction={speakersIntroSectionRecord.introductionText}
                preHeader={speakersIntroSectionRecord.preHeader}
              />
            );

          case "redirect_section":
            const redirectSectionRecord = section as RedirectSectionRecord;
            redirect(`/${locale}/${redirectSectionRecord.slugToRedirectTo}`);
          default:
            return <></>;
        }
      })}
    </div>
  );
}
