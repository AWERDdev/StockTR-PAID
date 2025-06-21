export interface StockData {
    symbol: string;
    companyName: string;
    price: number;
    changes: number;
    volAvg: number;
    website: string;
    sector?: string;
    industry?: string;
    marketCap?: number;
    beta?: number;
    lastDiv?: number;
    range?: string;
    changesPercentage?: string;
}

export interface StockResponse {
    metadata: {
        timestamp: number;
        totalStocks: number;
        lastUpdated: string;
    };
    stocks: {
        [key: string]: StockData;
    };
}
