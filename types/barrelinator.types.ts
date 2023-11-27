// ? TYPES
export enum ETypes {
  external = 'external',
  internal = 'internal',
  extension = 'extension'
}


// ? UNITS
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

// ? PARTS
export enum EParts {
  handguard = 'handguard',
  suppressor = 'suppressor',
  tracer = 'tracer',
  innerbarrel = 'innerbarrel',
  outerbarrel = 'outerbarrel',
  barrelextension = 'barrelextension'
}
export enum EPartsName {
  handguard = 'Garde main',
  suppressor = 'Silencieux',
  tracer = 'Traceur',
  innerbarrel = 'Canon Interne',
  outerbarrel = 'Canon Externe',
  barrelextension = 'Extension'
}
export interface IParts {
  slug: EParts;
  name: EPartsName|string;
  cols?: string;
  range: [number, number];
  type: ETypes;
  show: boolean;
}

// ? SETTINGS
export interface IDimensions {
  [EParts.handguard]: number;
  [EParts.suppressor]: number;
  [EParts.tracer]: number;
  [EParts.innerbarrel]: number;
  [EParts.outerbarrel]: number;
  [EParts.barrelextension]: number[];
}