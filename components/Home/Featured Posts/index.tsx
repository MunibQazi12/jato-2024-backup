import { FeaturedPostsSectionRecord, SiteLocale } from '@/graphql/generated';
import ModernPostCards from './ModernPostCards';
import CarrouselFeaturedPosts from './CarrouselFeaturedPosts';
import MinimalistFeaturedPostsGrid from './MinimalistFeaturedPostsGrid';
import FullImageFeaturedPosts from './FullImageFeaturedPosts';
import { ReactNode } from 'react';
import Blog from '@/components/Blog';

type FeaturedPostsProps = {
    featuredPostsSection: FeaturedPostsSectionRecord
    locale: SiteLocale
};

const FeaturedPosts = ({ featuredPostsSection, locale }: FeaturedPostsProps) => {

    const {
        featuredPosts,
        featuredPostsHeader,
        featuredPostsSubheader,
        displayOptions
    } = featuredPostsSection;

    const contentMapper: { [key: string]: ReactNode } = {
        modern_cards: <ModernPostCards locale={locale}
            blogData={featuredPosts}
            blogHeader={featuredPostsHeader}
            blogSubheader={featuredPostsSubheader}
        />,
        carrousel: <CarrouselFeaturedPosts locale={locale}
            blogData={featuredPosts}
            blogHeader={featuredPostsHeader}
            blogSubheader={featuredPostsSubheader}
        />,
        minimalist_grid: <MinimalistFeaturedPostsGrid locale={locale}
            blogData={featuredPosts}
            blogHeader={featuredPostsHeader}
            blogSubheader={featuredPostsSubheader}
        />,
        full_image_card: <FullImageFeaturedPosts
            locale={locale}
            blogData={featuredPosts}
            blogHeader={featuredPostsHeader}
            blogSubheader={featuredPostsSubheader}
        />
    }

    return (
        <>
            {
                contentMapper[displayOptions] || <Blog locale={locale}
                    blogData={featuredPosts}
                    blogHeader={featuredPostsHeader}
                    blogSubheader={featuredPostsSubheader}
                />
            }
        </>
    );
};

export default FeaturedPosts;
