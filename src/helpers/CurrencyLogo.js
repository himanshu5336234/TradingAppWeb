import { Format } from "./String";

const ICON_URL = "https://static-dev.density.exchange/icons/{0}.svg";

export const getCurrencyUrl = (symbol) => Format(ICON_URL, symbol);

/* Usage : Pass a currency/Symbol in lower case without the base asset. */
