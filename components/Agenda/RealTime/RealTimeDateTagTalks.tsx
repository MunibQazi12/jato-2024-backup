"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import DateTagTalks from "../DateTagTalks";
import {
  SiteLocale,
  DatetagQuery,
  DatetagQueryVariables,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeTagPosts({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: DatetagQuery;
  query: TypedDocumentNode<DatetagQuery, DatetagQueryVariables>;
  variables: DatetagQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <DateTagTalks lng={locale} data={data} />;
}
