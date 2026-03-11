export const UNIT = ["Ms", "S", "M", "H", "D"] as const;
type Unit = (typeof UNIT)[number];
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;
export type StringDelay = number | `${number}` | `${number}${UnitAnyCase}`;
