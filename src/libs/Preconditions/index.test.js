import Preconditions from './index';

describe('Preconditions', () => {
  describe('checkOrThrow', () => {
    it('check the correct expression', () => {
      expect(() => Preconditions.checkOrThrow(true)).not.toThrow();
    });

    it('check the incorrect expression', () => {
      expect(() => Preconditions.checkOrThrow(false)).toThrow(/^Error$/);
    });

    it('check the incorrect expression then throw with error message', () => {
      expect(() => Preconditions.checkOrThrow(false, 'xxx')).toThrow('xxx');
    });
  });

  describe('checkType', () => {
    it('should pass if the type checking is successful', () => {
      expect(() => Preconditions.checkType(1, 'number').not.toThrow());
    });

    it('should pass if the type checking is failed', () => {
      expect(() => Preconditions.checkType(1, 'string').toThrow('string required, but got number'));
    });
  });
});
