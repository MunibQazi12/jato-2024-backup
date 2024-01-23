"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import TalksPage from "../TalksPage";
import {
  TalksQuery,
  TalksQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeTalksPage({
  locale,
  initialData,
  token,
  query,
  page,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: TalksQuery;
  query: TypedDocumentNode<TalksQuery, TalksQueryVariables>;
  page: number;
  variables: TalksQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <TalksPage lng={locale} data={data} page={page} />;
}
