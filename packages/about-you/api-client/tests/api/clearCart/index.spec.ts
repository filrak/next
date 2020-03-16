import clearCart from '../../../src/api/clearCart';
import { apiClient } from '../../../src/index';

jest.mock('../../../src/index');

describe('[about-you-api-client] clearCart', () => {
  it('clears cart', async () => {
    const mockGetBasket = jest.fn(() => Promise.resolve({
      type: 'success',
      basket: {
        key: '',
        cost: 0,
        currencyCode: 'EUR',
        items: [
          {
            key: 'test'
          }
        ],
        packages: [
          {
            id: 1,
            carrierKey: '',
            deliveryDate: {
              max: '',
              min: ''
            }
          }
        ]
      }
    }));

    const mockDeleteItem = jest.fn((params) => params);

    (apiClient as any as jest.Mock).mockImplementation(() => ({
      basket: {
        get: mockGetBasket,
        deleteItem: mockDeleteItem
      }
    }));

    await clearCart('basket-key');

    expect(mockGetBasket).toHaveBeenCalledWith('basket-key');
    expect(mockDeleteItem).toHaveBeenCalledWith('basket-key', 'test');
  });
});
