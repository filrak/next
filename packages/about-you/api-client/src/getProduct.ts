import { api } from './';
type getProductSearchParams = { id: number; masterKey: string };

export default function(params: getProductSearchParams): Promise<ProductResponse> {
  const {
    id,
    with,
    masterKey
  } = params;

  if (id) {
    return api.products.getById(id);
  } else if (masterKey) {
    return api.products.getByMasterkey(masterKey);
  }
}
