import { useRouter } from 'next/navigation';
import { StockData } from '@/Types/StockData';

export const useStockWatchList = (stockData: StockData, RemovefromWatchlist: (stockData: StockData) => void) => {
    const router = useRouter();
    
    const truncateText = (text: string | undefined, maxLength: number): string => {
        if (!text) return "None";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };
    
    const handleNav = (): void => {
        if (stockData.website) {
            router.push(stockData.website);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation(); // Prevent triggering the parent div's onClick
        RemovefromWatchlist(stockData);
    };

    return {
        truncateText,
        handleNav,
        handleRemoveClick
    };
};
