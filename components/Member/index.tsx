import { MemberQuery, SiteLocale } from "@/graphql/generated";
import IFrame from "../IFrame";

type MemberProps = {
  data: MemberQuery;
  lng: SiteLocale;
};

const Member = ({
  data,
  lng
}: MemberProps) => {

  return (
    <section
      id="socialfeed"
      className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28 min-h-[calc(100vh-320px)]"
    >
      <div className="container">
        {
          data?.member?.iframeUrl
            ? <IFrame
              iframeUrl={data?.member?.iframeUrl || ''}
              btnText="Close Members"
              lng={lng}
            />
            : <div>Not found!</div>
            }
      </div>
    </section>
  );
};

export default Member;
