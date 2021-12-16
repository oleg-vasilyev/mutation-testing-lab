import { INodeItem, LinkedList } from './linked-list';


const [item1, item2, item3, item4, item5] = [
  { hash: '1', id: '1' },
  { hash: '2', id: '2' },
  { hash: '3', id: '3' },
  { hash: '4', id: '4' },
  { hash: '5', id: '5' },
];

describe('LinkedList', () => {
  let linkedList: LinkedList<INodeItem>;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  describe('parse()', () => {

    it('should return empty list if there are no stored nodes', () => {
      linkedList = LinkedList.parse([]);

      expect(linkedList.getFlatten()).toEqual([]);
    });

    it('should return a valid list if there are stored nodes', () => {
      linkedList = LinkedList.parse([
        { hash: '5|4', value: item5 },
        { hash: '4|3', value: item4 },
        { hash: '3|2', value: item3 },
        { hash: '2|1', value: item2 },
        { hash: '1|HEAD', value: item1 },
      ]);

      expect(linkedList.getFlatten()).toEqual([item1, item2, item3, item4, item5]);
    });
  });

  describe('deparse()', () => {

    it('should return an empty array if the list is empty', () => {

      // eslint-disable-next-line no-magic-numbers
      expect(linkedList.deparse().length).toBe(0);
    });

    it('should return a valid array for NON empty list', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .add(item4)
        .add(item5);

      expect(linkedList.deparse()).toEqual([
        { hash: '5|HEAD', value: item5 },
        { hash: '4|5', value: item4 },
        { hash: '3|4', value: item3 },
        { hash: '2|3', value: item2 },
        { hash: '1|2', value: item1 },
      ]);
    });
  });

  describe('getFlatten()', () => {

    it('should return empty array for empty list', () => {

      expect(linkedList.getFlatten()).toEqual([]);
    });

    it('should return all items as an array for NON empty list', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3);

      expect(linkedList.getFlatten()).toEqual([item3, item2, item1]);
    });

  });

  describe('add()', () => {

    it('should add an item to the top for empty list', () => {
      linkedList.add(item1);

      expect(linkedList.getFlatten()).toEqual([item1]);
    });

    it('should add an item to the top for NOT empty list', () => {
      linkedList
        .add(item1)
        .add(item2);

      expect(linkedList.getFlatten()).toEqual([item2, item1]);
    });
  });

  describe('remove()', () => {

    it('should be able to remove item from the list with single node', () => {
      linkedList
        .add(item1)
        .remove(item1);

      expect(linkedList.getFlatten()).toEqual([]);
    });

    it('should be able to remove item from the list with multiple nodes from the middle', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .remove(item2);

      expect(linkedList.getFlatten()).toEqual([item3, item1]);
    });

    it('should be able to remove item from the list with multiple nodes from the top', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .remove(item3);

      expect(linkedList.getFlatten()).toEqual([item2, item1]);
    });

    it('should be able to remove item from the list with multiple nodes from the bottom', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .remove(item1);

      expect(linkedList.getFlatten()).toEqual([item3, item2]);
    });
  });

  describe('update()', () => {

    it('should be able to update item when there is one node', () => {
      const updated = { hash: 'new', id: '1' };

      linkedList
        .add(item1)
        .update(updated);

      expect(linkedList.getFlatten()).toEqual([updated]);
    });

    it('should be able to update item when there are multiple nodes', () => {
      const updated = { hash: 'new', id: '2' };

      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .update(updated);

      expect(linkedList.getFlatten()).toEqual([item3, updated, item1]);
    });
  });

  describe('reorder()', () => {

    it('should update node when first and last items are changed', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .add(item4)
        .add(item5)
        .reorder([item1, item4, item3, item2, item5]);

      expect(linkedList.getFlatten()).toEqual([item1, item4, item3, item2, item5]);
    });

    it('should update node when first and middle items are changed', () => {
      linkedList
        .add(item1)
        .add(item2)
        .add(item3)
        .add(item4)
        .add(item5)
        .reorder([item3, item4, item5, item2, item1]);

      expect(linkedList.getFlatten()).toEqual([item3, item4, item5, item2, item1]);
    });
  });
});
