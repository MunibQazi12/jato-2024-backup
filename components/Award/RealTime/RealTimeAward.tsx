"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import Post from "../Award/Award";
import {
  AwardQuery,
  AwardQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeAward({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: AwardQuery;
  query: TypedDocumentNode<AwardQuery>;
  variables: AwardQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <Post lng={locale} data={data} />;
}
