import { DAY, HOUR, MINUTE, SECONDE } from "./constant";
import { type StringDelay, UNIT } from "./millisec.types";

export function millisec(t: StringDelay): number {
  if (typeof t === "number") {
    return t;
  }
  const regex = new RegExp(`^(-?\\d+(?:\\.\\d+)?)(${UNIT.join("|")})?$`, "i");
  const result = regex.exec(t);

  if (result === null) {
    throw new Error(`${t} n'est pas une entrée valide`);
  }
  const [, tValue, tUnit = "ms"] = result;

  const value = Number(tValue);

  switch (tUnit.toLowerCase()) {
    case "ms":
      return value;
    case "s":
      return value * SECONDE;
    case "m":
      return value * MINUTE;
    case "h":
      return value * HOUR;
    case "d":
      return value * DAY;
    default:
      throw new Error(`${tUnit} n'est pas une unité reconnue`);
  }
}
