import { createFormatPrice } from './../../src/getters/_utils';

const formatMock = jest.fn();

jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({ format: formatMock } as any));

describe('[commercetools-getters] utils/createPrice', () => {
  it('calls IntL', () => {
    createFormatPrice(123456);

    expect(formatMock).toBeCalled();
  });
});
