"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import SpeakerTalks from "../SpeakerTalks";
import {
  SpeakerQuery,
  SpeakerQueryVariables,
  SiteLocale,
} from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeSpeakerTalks({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: SpeakerQuery;
  query: TypedDocumentNode<SpeakerQuery, SpeakerQueryVariables>;
  variables: SpeakerQueryVariables;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });
  if (!data) return <></>;

  return <SpeakerTalks lng={locale} data={data} />;
}
