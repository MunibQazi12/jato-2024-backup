"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import Talk from "../Talk/Talk";
import {
  SpeakerRecord,
  TalkQuery,
  TalkQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeTalk({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: TalkQuery;
  query: TypedDocumentNode<TalkQuery>;
  variables: TalkQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,

    variables,
    token,
    initialData,
    preview: true,
  });
  if (!data) return <></>;

  return <Talk lng={locale} data={data} />;
}
