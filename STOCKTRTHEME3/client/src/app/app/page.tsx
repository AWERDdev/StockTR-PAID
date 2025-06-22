'use client'
import NavBarNoAUTH from '@/components/NavBarNoAUTH';
import { Search } from 'lucide-react';
import INFOBar from '@/components/INFOBar';
import Stock from '@/components/Stock';
import StockWatchList from '@/components/StockWatchList';
import { useAppData } from '@/tools/useAppData';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const App: React.FC = () => {
    const router = useRouter();
    const {
        user,
        isAUTH,
        isLoading,
        filteredStockData,
        watchlist,
        searchValue,
        handleSearch,
        addToWatchlist,
        removeStockFromWatchlist
    } = useAppData();

   

    useEffect(() => {
        if (!isLoading && !isAUTH) {
            router.push('/');
        }
    }, [isLoading, isAUTH, router]);

    if (isLoading) {
        return (
            <main className="h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <div>Loading...</div>
            </main>
        );
    }

    if (!isAUTH) {
        return null;
    }

    return (
        <main className="min-h-screen w-screen text-[#e0e0e0] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <NavBarNoAUTH UserData={user} />

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Market Overview */}
                <div className="bg-[hsl(0,0%,3%)] rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-[hsl(142,71%,25%)] rounded-lg p-4">
                            <h3 className="text-xl font-bold">S&P 500</h3>
                            <p className="text-lg">+1.2%</p>
                        </div>
                        <div className="bg-[hsl(0,84%,25%)] rounded-lg p-4">
                            <h3 className="text-xl font-bold">NASDAQ</h3>
                            <p className="text-lg">-0.8%</p>
                        </div>
                        <div className="bg-[hsl(217,91%,25%)] rounded-lg p-4">
                            <h3 className="text-xl font-bold">Dow Jones</h3>
                            <p className="text-lg">+0.5%</p>
                        </div>
                    </div>
                </div>

                {/* Improved Search Container */}
                <div className="flex justify-center">
                    <div className="relative w-full max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchValue}
                                onChange={handleSearch}
                                className="w-full h-12 pl-4 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 focus:border-blue-500 transition-all duration-200"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 rounded transition-colors duration-200">
                                <Search className="text-gray-400 hover:text-white w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stock List */}
                <div className="bg-[hsl(0,0%,3%)] rounded-lg shadow-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Stock Data</h2>
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-[790px]">
                                    <INFOBar />
                                    <div className="space-y-2">
                                        {Array.isArray(filteredStockData) && filteredStockData.length > 0 ? (
                                            filteredStockData.map((stock, index) => (
                                                <Stock
                                                    key={`${stock.symbol}-${index}`}
                                                    stockData={stock}
                                                    addToWatchlist={addToWatchlist}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-400">
                                                No stocks available at the moment.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Watchlist */}
                <div className="bg-[hsl(0,0%,3%)] rounded-lg shadow-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-[790px]">
                                    <INFOBar />
                                    <div className="space-y-2">
                                        {Array.isArray(watchlist) && watchlist.length > 0 ? (
                                            watchlist.map((stock, index) => (
                                                <StockWatchList
                                                    key={`${stock.symbol}-watchlist-${index}`}
                                                    stockData={stock}
                                                    RemovefromWatchlist={removeStockFromWatchlist}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-gray-400">
                                                Your watchlist is empty. Add some stocks to get started!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;
