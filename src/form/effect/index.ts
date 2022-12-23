import { useBusinessEffects } from './useBusinessEffects';
import { useEditBusinessEffects } from './useEditBusinessEffects';

export const createEffects = () => () => {
  //高阶函数，方便接收上下文依赖变量
  useBusinessEffects();
};

export const editEffects = () => () => {
  useEditBusinessEffects();
};
