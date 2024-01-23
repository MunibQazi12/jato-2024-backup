import { SiteLocale, SocialFeedQuery } from "@/graphql/generated";
import IFrame from "../IFrame";

type SocialFeedProps = {
  data: SocialFeedQuery;
  lng: SiteLocale;
};

const SocialFeed = ({
  data,
  lng
}: SocialFeedProps) => {

  return (
    <section
      id="socialfeed"
      className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28 min-h-[calc(100vh-320px)]"
    >
      <div className="container">
        <div>
          {
            data?.socialFeed?.iframe
              ? <IFrame
                iframeUrl={data?.socialFeed?.iframe || ''}
                btnText="Close Social"
                lng={lng}
              />
              : <div>Not found!</div>
          }

        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
