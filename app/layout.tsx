import "node_modules/react-modal-video/css/modal-video.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import "@/styles/global.css";
import { SiteLocale } from "@/graphql/generated";
import getAvailableLocales from "@/app/i18n/settings";
import Head from "./[lng]/Head";
import { ClerkProvider } from '@clerk/nextjs'
type Params = {
  children: React.ReactNode;
  params: {
    lng: SiteLocale;
  };
};

export async function generateStaticParams() {
  const languages = await getAvailableLocales();
  return languages.map((language) => {
    language;
  });
}
export const dynamic = "force-dynamic"

export default async function RootLayout({
  children,
  params: { lng },
}: Params) {
  return (
    <ClerkProvider>
      <html lang={lng || 'en'}>
        <Head />
        <body className={`tracking-tight antialiased`}>
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
