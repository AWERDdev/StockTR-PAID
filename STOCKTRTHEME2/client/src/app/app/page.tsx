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
            <main className="h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200/50">Loading...</div>
            </main>
        );
    }

    if (!isAUTH) {
        return null;
    }

    return (
        <main className="min-h-screen w-screen text-[#333333] bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <NavBarNoAUTH UserData={user} />

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Market Overview */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Market Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-green-800">S&P 500</h3>
                            <p className="text-lg text-green-600 font-semibold">+1.2%</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-red-800">NASDAQ</h3>
                            <p className="text-lg text-red-600 font-semibold">-0.8%</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-xl font-bold text-blue-800">Dow Jones</h3>
                            <p className="text-lg text-blue-600 font-semibold">+0.5%</p>
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
                                className="w-full h-14 pl-6 pr-14 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-300 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 shadow-lg"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                                <Search className="text-gray-500 hover:text-gray-700 w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stock List */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Stock Data</h2>
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-[790px]">
                                    <INFOBar />
                                    <div className="space-y-3">
                                        {Array.isArray(filteredStockData) && filteredStockData.length > 0 ? (
                                            filteredStockData.map((stock, index) => (
                                                <Stock
                                                    key={`${stock.symbol}-${index}`}
                                                    stockData={stock}
                                                    addToWatchlist={addToWatchlist}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
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
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Watchlist</h2>
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-[790px]">
                                    <INFOBar />
                                    <div className="space-y-3">
                                        {Array.isArray(watchlist) && watchlist.length > 0 ? (
                                            watchlist.map((stock, index) => (
                                                <StockWatchList
                                                    key={`${stock.symbol}-watchlist-${index}`}
                                                    stockData={stock}
                                                    RemovefromWatchlist={removeStockFromWatchlist}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
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
