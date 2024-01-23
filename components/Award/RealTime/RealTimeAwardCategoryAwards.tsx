"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import AwardsCategoryAwards from "../AwardCategoryAwards";
import {
  AwardCategoryQuery,
  AwardCategoryQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeAwardCategoryAwards({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: AwardCategoryQuery;
  query: TypedDocumentNode<AwardCategoryQuery, AwardCategoryQueryVariables>;
  variables: AwardCategoryQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });
  if (!data) return <></>;

  return <AwardsCategoryAwards lng={locale} data={data} />;
}
