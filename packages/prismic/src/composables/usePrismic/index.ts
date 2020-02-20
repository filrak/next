import { ref, Ref } from '@vue/composition-api';
import { prismic, endpoint, apiOptions } from '../../index';
import { PrismicQuery, PrismicMeta } from '../../types';
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi';
import transformQuery from './transformQuery';
import { Document } from 'prismic-javascript/d.ts/documents';

interface OptionsType {
  orderings?: string;
  pageSize?: number;
  page?: number;
}

type Search = (query: PrismicQuery | PrismicQuery[], options?: OptionsType) => Promise<void>;

interface UsePrismic {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  doc: Ref<Document | Document[]>;
  meta: Ref<PrismicMeta | null>;
  search: Search;
  searchFirst: Search;
}

export default function usePrismic(): UsePrismic {
  const loading = ref(false);
  const error = ref(null);
  const doc: Ref<Document | Document[]> = ref({});
  const meta: Ref<PrismicMeta | null> = ref(null);

  const search: Search = async (query: PrismicQuery | PrismicQuery[], options: OptionsType = {}) => {
    loading.value = true;

    await prismic
      .getApi(endpoint, apiOptions)
      .then((api) => api.query(
        transformQuery(query),
        options as QueryOptions
      ))
      // eslint-disable-next-line
      .then(({ results, total_results_size, total_pages, results_size, results_per_page, prev_page, page, next_page }) => {
        meta.value = {
          next_page, // eslint-disable-line
          prev_page, // eslint-disable-line
          page,
          results_per_page, // eslint-disable-line
          results_size, // eslint-disable-line
          total_pages, // eslint-disable-line
          total_results_size // eslint-disable-line
        };
        doc.value = results;
      });

    loading.value = false;
  };

  const searchFirst: Search = async (query: PrismicQuery | PrismicQuery[], options: OptionsType = {}) => {
    loading.value = true;

    doc.value = await prismic
      .getApi(endpoint, apiOptions)
      .then((api) => api.queryFirst(
        transformQuery(query),
        options as QueryOptions
      ));

    loading.value = false;
  };

  return {
    loading,
    error,
    doc,
    meta,
    search,
    searchFirst
  };
}
