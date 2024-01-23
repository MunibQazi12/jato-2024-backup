'use client'
import Image from "next/image";
import Link from "next/link";
import {
  FooterQuery,
  LegalPageRecord,
  SiteLocale,
} from "@/graphql/generated";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import { AppContext } from "@/context/App";

type Props = {
  data: FooterQuery;
  lng: SiteLocale;
};

const Footer = ({ data, lng }: Props) => {

  const { theme } = useContext(AppContext);

  return (
    <>
      <footer className="relative z-10 mx-auto flex w-full flex-col items-center justify-center bg-primary dark:bg-dark-background bg-opacity-5 pt-16 text-center md:text-start lg:pt-24">
        <div className="container w-full">
          <div className="flex w-full flex-col justify-between md:flex-row md:px-16">
            <div className="w-full">
              <div className="md:mb-12 sm:mb-8 mb-5 lg:mb-16">
                <Link href={`/${lng}/about`} className="mb-8 inline-block">
                  {data.layout?.footerLogo && (
                    <Image
                      src={
                        theme === 'dark'
                          ? '/jato-logo-crop-for-web-dark-theme.png'
                          : '/jato-logo-crop-for-web.png'}
                      alt="logo"
                      className="xl:w-60 lg:w-48 w-36 dark:invert-1 dark:brightness-300"
                      width={data.layout.footerLogo.width || 60}
                      height={data.layout.footerLogo.height || 60}
                    />
                  )}
                </Link>
                <div className="md:mb-9 mb-6 text-base font-medium leading-relaxed text-body-color dark:text-darktext">
                  <ReactMarkdown>
                    {data.layout!.footerSubtitle || ""}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="flex w-full md:text-end">
              <div className="w-full">
                <div className="lg:mb-16 md:mb-12 mb-8">
                  <h2 className="md:mb-10 mb-6 text-xl font-bold text-black dark:text-darktext">
                    Legal
                  </h2>
                  <ul>
                    {data.layout!.footerLinks.map((link) => {
                      const pageLink = link as LegalPageRecord; // The field has a "at least one" validation
                      return (
                        <li key={pageLink.id}>
                          <Link
                            href={"/" + lng + "/legal/" + pageLink.slug}
                            className="mb-4 inline-block text-base font-medium text-body-color dark:text-darktext hover:text-primary"
                          >
                            {" "}
                            {pageLink.title}{" "}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
