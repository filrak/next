import clearCart from '../../../src/api/clearCart';
import { apiClient } from '../../../src/index';

describe('[about-you-api-client] clearCart', () => {
  it('adds item to cart', async () => {
    const mockGetBasket = jest.fn(() => Promise.resolve({
      basket: {
        items: [
          {
            key: 'test'
          }
        ]
      }
    }));

    const mockClearCart = jest.fn((params) => params);

    // @ts-ignore
    apiClient.basket.get = mockGetBasket;
    apiClient.basket.deleteItem = mockClearCart;

    await clearCart('basket-key');

    expect(mockGetBasket).toHaveBeenCalledWith('basket-key');
    expect(mockClearCart).toHaveBeenCalledWith('basket-key', 'test');
  });
});
