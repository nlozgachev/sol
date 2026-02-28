import { FOUNDATION, TABLEAU, WASTE } from "../internal/constants.ts";
import { WithMovingCards, WithTargetStates } from "./card.ts";

export type WithCmdAction<T extends symbol> = { action: T };
export type WithCount = { count: number };
export type FromTo<From, To> =
  & {
    from: From;
    to: To;
  }
  & WithMovingCards
  & WithTargetStates;
export type WithPile<T extends symbol> = { pile: T };
export type WithIndexedPile<T extends symbol, IDX> = WithPile<T> & {
  index: IDX;
};
export type WithAutoIndexPile<T extends symbol> =
  & WithPile<T>
  & WithIndexedPile<T, "auto">;
export type WithNoneIndexPile<T extends symbol> =
  & WithPile<T>
  & WithIndexedPile<T, "none">;

export type AllCardLocations =
  | TableauLocation
  | FoundationLocation
  | WasteLocation
  | FoundationLocationUnknownIndex;
export type PileID = typeof TABLEAU | typeof FOUNDATION | typeof WASTE;
export type CardSource = WasteLocation | TableauLocation | FoundationLocation;
export type CardDestination = TableauLocation | FoundationLocationUnknownIndex;
export type CardDestinationInjectedIndex = TableauLocation | FoundationLocation;

export type TableauLocation = WithIndexedPile<typeof TABLEAU, number>;
export type FoundationLocation = WithIndexedPile<typeof FOUNDATION, number>;
export type FoundationLocationUnknownIndex = WithAutoIndexPile<
  typeof FOUNDATION
>;
export type WasteLocation = WithNoneIndexPile<typeof WASTE>;

export type FromTableauToFoundation = FromTo<
  TableauLocation,
  FoundationLocation
>;
export type FromTableauToTableau = FromTo<TableauLocation, TableauLocation>;
export type FromFoundationToTableau = FromTo<
  FoundationLocation,
  TableauLocation
>;
export type FromWasteToFoundation = FromTo<WasteLocation, FoundationLocation>;
export type FromWasteToTableau = FromTo<WasteLocation, TableauLocation>;

export type ValidMove =
  | FromTableauToFoundation
  | FromTableauToTableau
  | FromFoundationToTableau
  | FromWasteToFoundation
  | FromWasteToTableau;
