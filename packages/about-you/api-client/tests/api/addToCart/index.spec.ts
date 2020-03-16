import addToCart from '../../../src/api/addToCart';
import { apiClient } from '../../../src/index';

const mockAddItem = jest.fn((params) => params);

apiClient.basket.addItem = mockAddItem;

describe('[about-you-api-client] addToCart', () => {
  it('adds item to cart', async () => {
    const addToBasketParams = {
      basketKey: '',
      variantId: 1
    };

    await addToCart(addToBasketParams);

    expect(mockAddItem).toHaveBeenCalledWith(addToBasketParams.basketKey, addToBasketParams.variantId);
  });
});
