import { ref, Ref } from '@vue/composition-api';
import { prismic, endpoint, apiOptions } from '../../index';
import { PrismicQuery, PrismicMeta } from '../../types';
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import transformQuery from './transformQuery';
import { Document } from 'prismic-javascript/d.ts/documents';

interface CustomQueryOptions {
  orderings?: string;
  pageSize?: number;
  page?: number;
}

type OptionsType = CustomQueryOptions & QueryOptions;

type Search = (query: PrismicQuery | PrismicQuery[], options?: OptionsType, getFirst?: boolean) => Promise<void>;

interface UsePrismic {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  doc: Ref<Document | Document[]>;
  meta: Ref<PrismicMeta | null>;
  search: Search;
}

export default function usePrismic(): UsePrismic {
  const loading = ref(false);
  const error = ref(null);
  const doc: Ref<Document | Document[]> = ref({});
  const meta: Ref<PrismicMeta | null> = ref(null);

  const search: Search = async (query: PrismicQuery | PrismicQuery[], options: OptionsType = {}, getFirst = false) => {
    loading.value = true;

    const api = await prismic.getApi(endpoint, apiOptions);

    if (getFirst) {
      doc.value = await api.queryFirst(
        transformQuery(query),
        options
      );
    } else {
      const { results, ...metadata } = await api.query(
        transformQuery(query),
        options
      );

      meta.value = metadata;
      doc.value = results;
    }

    loading.value = false;
  };

  return {
    loading,
    error,
    doc,
    meta,
    search
  };
}
