import { ServerRespond } from './DataStreamer';

export interface Row {
  // stock: string,
  // top_ask_price: number,
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row 
  {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upBound = 1 + 0.1;
    const lowBound = 1 - 0.1;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: (serverResponds[1].timestamp < serverResponds[0].timestamp) ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound: upBound,
      lower_bound: lowBound,
      trigger_alert: (upBound < ratio || lowBound > ratio) ? ratio : undefined
    };

    // return serverResponds.map((el: any) => {
    //   return {
    //     stock: el.stock,
    //     top_ask_price: el.top_ask && el.top_ask.price || 0,
    //     timestamp: el.timestamp,
    //   };
    // })
  }
}
