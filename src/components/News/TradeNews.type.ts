export interface TradeCardData {
  Symbol: string;
  id: string;
  change: string;
  value: string;
}
export interface DataContainer {
  data: TradeCardData[];
}
export interface TradeCardLabel extends DataContainer {
  label: string;
}
export interface TradeNewsMarketData {
  date: string;
  image_url: string;
  news_url: string;
  sentiment: string;
  source_name: string;
  text: string;
  title: string;
  topics: string[];
  type: string;
}
