// Makes requests to CryptoCompare API

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange: any, fromSymbol: any, toSymbol: any) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`
  };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol: string) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }

  return {
    exchange: match[1],
    fromSymbol: match[2],
    toSymbol: match[3]
  };
}
export const widgetContainer = {
  locale: navigator.language.split("-")[0] || "en-IN",
  auto_save_delay: 1,
  load_last_chart: true,
  autosize: true,
  allow_symbol_change: true,
  theme: "dark",
  timezone: "Asia/Kolkata",
  library_path: "charting_library/charting_library.js",
  custom_css_url: "css/style.css",
  // debug:true,
  disabled_features: ["context_menus", "use_localstorage_for_settings", "header_saveload", "header_symbol_search", "symbol_search_hot_key"],
  enabled_features: ["study_templates", "hide_left_toolbar_by_default", "header_chart_type", "show_symbol_logos", "hide_right_toolbar"],
  toolbar_bg: "#1B1B1F",
  loading_screen: {
    backgroundColor: "#1B1B1F",
    foregroundColor: "#E2FF6F"
  },
  overrides: {
    "paneProperties.backgroundType": "solid",
    "paneProperties.background": "#1B1B1F",
    "paneProperties.textColor": "#101010",
    "paneProperties.vertGridProperties.color": "#222225",
    "paneProperties.horzGridProperties.color": "#222225",
    "paneProperties.bottomMargin": 1,
    "paneProperties.topMargin": 1,
    // "paneProperties.crossHairProperties.color": "#A9A9A9",
    "mainSeriesProperties.candleStyle.borderUpColor": "#29B57E",
    "mainSeriesProperties.candleStyle.borderDownColor": "#F46151",
    "mainSeriesProperties.candleStyle.borderColor": "#29B57E",
    "mainSeriesProperties.candleStyle.upColor": "#29B57E",
    "mainSeriesProperties.candleStyle.downColor": "#F46151",
    "mainSeriesProperties.candleStyle.wickColor": "#29B57E",
    "mainSeriesProperties.candleStyle.wickUpColor": "#29B57E",
    "mainSeriesProperties.candleStyle.wickDownColor": "#F46151",

    "scalesProperties.textColor": "#D8D8DD",
    "scalesProperties.fontSize": 11,
    "scalesProperties.backgroundColor": "#171717",
    "scalesProperties.showBidAskLabels": true
    // "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0.00)",
    // "symbolWatermarkProperties.visibility": false
  }
};
export const configurationData = {
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "240", "360", "480", "720", "1D", "3D", "1W", "1M"]
};
