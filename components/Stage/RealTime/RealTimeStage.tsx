"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import Stage from "../Stage/Stage";
import {
  PostQuery,
  PostQueryVariables,
  SiteLocale,
  StageQuery,
  StageQueryVariables,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimePost({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: StageQuery;
  query: TypedDocumentNode<StageQuery>;
  variables: StageQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <Stage lng={locale} data={data} />;
}
