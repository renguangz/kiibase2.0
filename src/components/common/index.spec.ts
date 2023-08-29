import { COLORS } from '@/src/utils';
import { mapColorFromConfig } from '.';

describe('MapColorFromConfig', () => {
  it('should return primary color', () => {
    expect(mapColorFromConfig('primary')).toEqual(COLORS.primary);
  });

  it('should return warning color', () => {
    expect(mapColorFromConfig('warning')).toEqual(COLORS.warning);
  });

  it('should return danger color', () => {
    expect(mapColorFromConfig('danger')).toEqual(COLORS.danger);
  });
});
