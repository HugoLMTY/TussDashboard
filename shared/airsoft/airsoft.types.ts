import * as Parts from './parts.types';
import * as Rifle from './rifle.types';

interface IPiece {
  img: string;
  name: string;
  link: string;
  brand: string;
  description: string;
}

interface IAccessory extends IPiece {
  type: Parts.EPartsTypes;
  part: Parts.EParts;
}

interface IRifle extends IPiece {
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
  IPiece,
  IAccessory,
  IRifle,
}