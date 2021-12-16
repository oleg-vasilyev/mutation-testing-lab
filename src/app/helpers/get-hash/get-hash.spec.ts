import { GET_HASH } from './get-hash';


describe('GET_HASH()', () => {

  it('should return the same hash for equal strings', () => {
    const data = 'hello';

    expect(GET_HASH(data)).toBe(GET_HASH(data));
  });

  it('should return different hash for different strings', () => {
    expect(GET_HASH('hello')).not.toBe(GET_HASH('test'));
  });
});
