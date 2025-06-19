'use client'

import { StockData } from '@/Types/StockData';
import { useStockWatchList } from '@/tools/useStockWatchList';

interface StockProps {
    stockData: StockData;
    RemovefromWatchlist: (stockData: StockData) => void;
}

const StockWatchList: React.FC<StockProps> = ({ stockData, RemovefromWatchlist }) => {
    const { truncateText, handleNav, handleRemoveClick } = useStockWatchList(stockData, RemovefromWatchlist);
    
    return (
        <div 
            className="StockItem p-4 hover:cursor-pointer hover:bg-[hsl(0,0%,9%)] transition-colors overflow-x-auto" 
            onClick={handleNav}
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto min-w-[630px]">
                {/* Stock Info Section */}
                <div className="flex space-x-8 w-1/3 truncate">
                    <h3 className="symbol font-medium">{stockData.symbol || "None"}</h3>
                    <span className="name text-gray-400" title={stockData.companyName}>
                        {truncateText(stockData.companyName, 20)}
                    </span>
                </div>

                {/* Price Info Section */}
                <div className="flex items-center justify-center space-x-8 w-1/3 truncate">
                    <div className="price">{stockData.price ?? "None"}</div>
                    <div className="change flex items-center">{stockData.changes ?? "None"}</div>
                    <div className="flex items-center text-gray-400">
                        <span className="volume">{stockData.volAvg ?? "None"}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="w-1/3 flex justify-end">
                    <button
                        className="px-4 py-2 rounded-md hover:bg-[hsl(0,0%,9%)] transition-colors"
                        onClick={handleRemoveClick}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockWatchList;
