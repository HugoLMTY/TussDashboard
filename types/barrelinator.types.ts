export enum EUnits {
  mm = 'mm',
  in = 'in'
}
export enum EUnitsName {
  mm = 'Millimètre',
  in = 'Pouce'
}
export interface IUnits {
  slug: EUnits;
  name: EUnitsName;
}

export enum EParts {
  handguard = 'handguard',
  suppressor = 'suppressor',
  tracer = 'tracer',
  innerbarrel = 'innerbarrel'
}
export enum EPartsName {
  handguard = 'Garde main',
  suppressor = 'Silencieux',
  tracer = 'Traceur',
  innerbarrel = 'Canon Interne'
}
export interface IParts {
  slug: EParts;
  name: EPartsName;
  cols?: string;
  range: [number, number];
}

export interface IShow {
  [EParts.handguard]: boolean;
  [EParts.suppressor]: boolean;
  [EParts.tracer]: boolean;
  [EParts.innerbarrel]: boolean;
}

export interface IDimensions {
  [EParts.handguard]: number;
  [EParts.suppressor]: number;
  [EParts.tracer]: number;
  [EParts.innerbarrel]: number;
}