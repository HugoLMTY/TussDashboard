import * as Parts from './parts.types';
import * as Rifle from './rifle.types';

interface IPiece {
  id: string;
  img: string;
  name: string;
  link?: string;
  brand?: string;
  description?: string;

  weight?: number;
  dimensions?: { x: number, y: number };
}

interface IRifle extends IPiece {
  type: Rifle.ERifleTypes;
  // fps?: number;
  // rof?: number;
  // range?: number;
  parts: IAccessory[];
}

interface IAccessory extends IPiece {
  type: Parts.EPartsTypes;
  part: Parts.EParts;
}

export * as Parts from './parts.types';
export * as Rifle from './rifle.types';
export {
  IPiece,
  IAccessory,
  IRifle,
}