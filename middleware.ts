import { NextRequest, NextResponse } from 'next/server';
import getAvailableLocales, { getFallbackLocale } from './app/i18n/settings';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SiteLocale } from './graphql/generated';
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

async function getLocale(
  request: Request,
  locales: SiteLocale[]
): Promise<string> {
  const fallbackLng = await getFallbackLocale();
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get('accept-language');
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, fallbackLng);
}

export default authMiddleware({
  beforeAuth: async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const locales = await getAvailableLocales();
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathname === '/redirect-to-circle') {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_CIRCLE_APP || '');
    }

    if (pathname === '/') {
      const locale = await getLocale(request, locales);
      return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
    }
    //go to the specific locale home if there is no pathname but the locale is set
    if (
      pathname.split('/').length === 2 &&
      locales.includes(pathname.split('/')[1] as SiteLocale)
    ) {
      return NextResponse.redirect(
        new URL(`/${pathname.split('/')[1]}/home`, request.url)
      );
    }

    //go to pathname in browser language if locale is missing but pathname is set
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request, locales);
      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url)
      );
    }
  },
  afterAuth: async (auth, req: NextRequest, evt) => {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: '' });
    }
  },
  ignoredRoutes: (req) => {
    const pathname = req.nextUrl.pathname;
    const locale = pathname.split('/')[1];
    return (req.url.includes(`/${locale}/home`) || req.url.includes('/api/revalidateCache'))
  },
  publicRoutes: ['/api/revalidateCache']
})

export const config = {
  matcher: ['/((?!.*\\.|_next|api\\/).*)', "/((?!.*\\..*|_next).*)", "/"],
};
