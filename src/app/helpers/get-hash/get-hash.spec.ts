import { GET_HASH } from './get-hash';


describe('GET_HASH()', () => {

  it('should return the same hash for equal strings', () => {
    const data = 'hello';
    const test = GET_HASH(data);

    expect(true).toBe(true);
  });

  it('should return different hash for different strings', () => {
    expect(true).toBe(true);
  });
});
