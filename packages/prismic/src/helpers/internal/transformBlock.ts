import parseType from './parseType';
import { PrismicTransformedBlock } from 'src/types';

const transformBlock = (block: any | any[]): PrismicTransformedBlock => ({
  type: parseType(block),
  element: typeof block === 'object'
    ? block
    : [{
      type: 'paragraph',
      text: block,
      spans: []
    }]
})

export default transformBlock
