"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import AwardsPage from "../AwardsPage";
import {
  AwardsQuery,
  AwardsQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeAwardsPage({
  locale,
  initialData,
  token,
  query,
  page,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: AwardsQuery;
  query: TypedDocumentNode<AwardsQuery, AwardsQueryVariables>;
  page: number;
  variables: AwardsQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <AwardsPage lng={locale} data={data} page={page} />;
}
