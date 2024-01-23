"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import TagAwards from "../AwardTypeTagAward";
import {
  AwardTagQuery,
  AwardTagQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeTagAwards({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: AwardTagQuery;
  query: TypedDocumentNode<AwardTagQuery, AwardTagQueryVariables>;
  variables: AwardTagQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <TagAwards lng={locale} data={data} />;
}
