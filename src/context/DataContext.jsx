import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const DataContext = createContext(null);

// Helper function to sum donations
const sumDonations = (donations, currency, startDate = new Date(0), endDate = new Date()) => {
    return donations
        .filter(donation => 
            donation.Currency === currency &&
            new Date(donation.DateOfDonation) >= startDate &&
            new Date(donation.DateOfDonation) <= endDate
        )
        .reduce((total, donation) => total + donation.Amount, 0);
};

// Provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        staff: [],
        donors: [],
        donations: [],
        campaigns: [],
        totalDonations: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dynamically import the JSON data from a local path
                const result = await import('../db.json');
                const { donations } = result.default;

                // Calculate total donations
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const lastWeek = new Date(new Date().setDate(today.getDate() - 7));
                const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                const totalDonations = {
                    today: {
                        KES: sumDonations(donations, 'KES', today),
                        USD: sumDonations(donations, 'USD', today)
                    },
                    weekly: {
                        KES: sumDonations(donations, 'KES', lastWeek),
                        USD: sumDonations(donations, 'USD', lastWeek)
                    },
                    monthly: {
                        KES: sumDonations(donations, 'KES', lastMonth),
                        USD: sumDonations(donations, 'USD', lastMonth)
                    },
                    allTime: {
                        KES: sumDonations(donations, 'KES'),
                        USD: sumDonations(donations, 'USD')
                    }
                };
                setData({ ...result.default, totalDonations });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ ...data, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

// Hook to use data context
export const useData = () => useContext(DataContext);
