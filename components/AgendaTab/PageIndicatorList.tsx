import { SiteLocale } from "@/graphql/generated";
import Link from "next/link";

type Props = {
    agendaTabCount: number;
  lng: SiteLocale;
};

const PageIndicatorList = ({ agendaTabCount, lng }: Props) => {
  const listOfPages = [];

  for (let i = 0; i * 9 < agendaTabCount; i++) {
    listOfPages.push(
      <li className="mx-1">
        <Link
          href={
            i === 0
              ? "/" + lng + "/agenda-tab/"
              : "/" + lng + "/agenda-tab/page/" + (i + 1)
          }
          className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
        >
          {i + 1}
        </Link>
      </li>
    );
  }

  return listOfPages;
};

export default PageIndicatorList;
