import { apiClient } from '../../index';
import { DeleteItemParameters } from '@aboutyou/backbone/endpoints/basket/deleteItem';

export default async function (options: DeleteItemParameters) {
  await apiClient.basket.deleteItem(options.basketKey, options.itemKey);
}
