import { GET_GUID } from './get-guid';


describe('GET_GUID', () => {

  it('should return a unique string each time', () => {
    const guid1 = GET_GUID();
    const guid2 = GET_GUID();

    expect(guid1).not.toEqual(guid2);
  });
});
