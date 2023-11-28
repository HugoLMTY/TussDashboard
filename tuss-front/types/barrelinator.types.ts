import * as Airsoft from '@hugolmty/shared-types';

// ? TYPES
export enum EPartsTypes {
  external = Airsoft.Parts.EPartsTypes.external,
  internal = Airsoft.Parts.EPartsTypes.internal,
  extension = Airsoft.Parts.EPartsTypes.extension
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
  handguard = Airsoft.Parts.EParts.handguard,
  suppressor = Airsoft.Parts.EParts.suppressor,
  tracer = Airsoft.Parts.EParts.tracer,
  innerbarrel = Airsoft.Parts.EParts.innerbarrel,
  outerbarrel = Airsoft.Parts.EParts.outerbarrel,
  barrelextension = Airsoft.Parts.EParts.barrelextension
}
export enum EPartsName {
  handguard = Airsoft.Parts.EPartsName.handguard,
  suppressor = Airsoft.Parts.EPartsName.suppressor,
  tracer = Airsoft.Parts.EPartsName.tracer,
  innerbarrel = Airsoft.Parts.EPartsName.innerbarrel,
  outerbarrel = Airsoft.Parts.EPartsName.outerbarrel,
  barrelextension = Airsoft.Parts.EPartsName.barrelextension,
}
export interface IParts {
  slug: Airsoft.Parts.EParts;
  name: Airsoft.Parts.EPartsName|string;
  cols?: string;
  range: [number, number];
  type: Airsoft.Parts.EPartsTypes;
  show: boolean;
}

// ? SETTINGS
export interface IDimensions {
  [Airsoft.Parts.EParts.handguard]: number;
  [Airsoft.Parts.EParts.suppressor]: number;
  [Airsoft.Parts.EParts.tracer]: number;
  [Airsoft.Parts.EParts.innerbarrel]: number;
  [Airsoft.Parts.EParts.outerbarrel]: number;
  [Airsoft.Parts.EParts.barrelextension]: number[];
}