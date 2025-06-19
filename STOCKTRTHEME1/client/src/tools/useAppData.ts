import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';
import { StockData } from '@/Types/StockData';
import { redirect } from 'next/navigation';

export const useAppData = () => {
    const [isAUTH, setIsAUTH] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [filteredStockData, setFilteredStockData] = useState<StockData[]>([]);
    const [watchlist, setWatchlist] = useState<StockData[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const handleLogout = async (): Promise<void> => {
        localStorage.removeItem('token');
        setIsAUTH(false);
        window.location.href = '/';
    };

    const handleNavBar = async (): Promise<void> => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
            setIsAUTH(false);
            setIsLoading(false);
            redirect('/');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/isAUTH`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIsAUTH(data.AUTH);
            if (data.UserData) {
                setUser(data.UserData);
            }
            
            if (!data.AUTH) {
                localStorage.removeItem('token');
                redirect('/');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsAUTH(false);
            setUser(null);
            localStorage.removeItem('token');
            redirect('/');
        } finally {
            setIsLoading(false);
        }
    };

    const receiveStock = async (): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/Stock`);
            if (!response.ok) {
                throw new Error('Failed to fetch stock data');
            }
            const data = await response.json();
            setStockData(data);
            setFilteredStockData(data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setStockData([]);
            setFilteredStockData([]);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchValue(value);
        const filtered = stockData.filter((stock: StockData) =>
            stock.companyName?.toLowerCase().includes(value.toLowerCase()) ||
            stock.symbol?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStockData(filtered);
    };

    const addToWatchlist = async (stock: StockData): Promise<void> => {
        if (watchlist.some((item: StockData) => item.symbol === stock.symbol)) {
            return;
        }
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/WatchlistUpdate`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    watchlist: [...watchlist, stock]
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update watchlist');
            }

            await getWatchlist();
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    };
    
    const removeStockFromWatchlist = async (stock: StockData): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/Watchlist/${stock.symbol}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove stock from watchlist');
            }

            await getWatchlist();
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    const getWatchlist = async (): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setWatchlist([]);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/Watchlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch watchlist');
            }

            const data = await response.json();
            setWatchlist(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching watchlist:', error);
            setWatchlist([]);
        }
    };

    useEffect(() => {
        handleNavBar();
        receiveStock();
    }, []);

    useEffect(() => {
        if (user && isAUTH) {
            getWatchlist();
        }
    }, [user, isAUTH]);

    return {
        isAUTH,
        isLoading,
        user,
        stockData,
        filteredStockData,
        watchlist,
        searchValue,
        handleLogout,
        handleSearch,
        addToWatchlist,
        removeStockFromWatchlist,
        setIsLoading,
        setUser
    };
};