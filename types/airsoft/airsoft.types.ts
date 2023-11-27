import * as Parts from './parts.types';
import * as Rifle from './rifle.types';

interface IItem {
  img: string;
  name: string;
  link: string;
  brand: string;
  description: string;
  // price: number;
  // weight: number;
}

interface IAccessory extends IItem {
  type: Parts.EPartsTypes;
  part: Parts.EParts;
}

interface IRifle extends IItem {
  type: Rifle.ERifleTypes;
  fps: number;
  rof: number;
  range: number;
  length: number;
  weight: number;
  parts: IAccessory[];
}


export * as Parts from './parts.types';
export * as Rifle from './rifle.types';
export {
  IItem,
  IAccessory,
  IRifle,
}