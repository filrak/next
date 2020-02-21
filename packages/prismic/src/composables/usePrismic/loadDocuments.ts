import { prismic, endpoint, apiOptions } from '../../index';
import { PrismicQuery, OptionsType, PrismicMeta } from '../../types';
import transformQuery from './transformQuery';
import { Document } from 'prismic-javascript/d.ts/documents';

interface LoadDocuments {
  results: Document | Document[];
  metadata: PrismicMeta | null;
}

export default async (query: PrismicQuery | PrismicQuery[], options: OptionsType = {}, getFirst: boolean): Promise<LoadDocuments> => {
  const api = await prismic.getApi(endpoint, apiOptions);

  if (getFirst) {
    return {
      results: await api.queryFirst(transformQuery(query), options),
      metadata: null
    };
  }

  const { results, ...metadata } = await api.query(transformQuery(query), options);

  return {
    results,
    metadata
  };
};
