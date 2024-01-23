"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import StagesPage from "../StagesPage";
import {
  PostsQuery,
  PostsQueryVariables,
  SiteLocale,
  StagesQuery,
  StagesQueryVariables,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeStagesPage({
  locale,
  initialData,
  token,
  query,
  page,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: StagesQuery;
  query: TypedDocumentNode<StagesQuery, StagesQueryVariables>;
  page: number;
  variables: StagesQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <StagesPage lng={locale} data={data} page={page} />;
}
