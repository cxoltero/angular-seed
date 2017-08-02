import 'jest-preset-angular';
import '../../../tests/__mocks__/jestGlobalMocks';
import { BootstrapComponent } from './bootstrap.component';

describe('BootstrapComponent', () => {
  it('should be defined', () => {
    expect(BootstrapComponent).not.toBeNull();
  });
});