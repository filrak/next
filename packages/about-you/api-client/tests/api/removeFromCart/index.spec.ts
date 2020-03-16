import removeFromCart from '../../../src/api/removeFromCart';
import { apiClient } from '../../../src/index';

const mockDeleteItem = jest.fn((params) => params);

apiClient.basket.deleteItem = mockDeleteItem;

describe('[about-you-api-client] removeFromCart', () => {
  it('removes item from cart', async () => {
    const removeFromBasketParams = {
      basketKey: '',
      itemKey: ''
    };
    await removeFromCart(removeFromBasketParams);

    expect(mockDeleteItem).toHaveBeenCalledWith(removeFromBasketParams.basketKey, removeFromBasketParams.itemKey);
  });
});
