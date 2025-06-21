import { useRouter } from 'next/navigation';
import { StockData } from '@/Types/StockData';

export const useStock = (stockData: StockData, addToWatchlist: (stockData: StockData) => void) => {
    const router = useRouter();
    
    const truncateText = (text: string | undefined, maxLength: number): string => {
        if (!text) return "None";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };
    
    const handleNav = (): void => {
        if (stockData.website) {
            // If it's an external website, open in new tab
            if (stockData.website.startsWith('http')) {
                window.open(stockData.website, '_blank');
            } else {
                // If it's an internal route, use navigate
                router.push(stockData.website);
            }
        }
    };

    const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation(); // Prevent triggering the parent div's onClick
        addToWatchlist(stockData);
    };

    return {
        truncateText,
        handleNav,
        handleAddClick
    };
};
