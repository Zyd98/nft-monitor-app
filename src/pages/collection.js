import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStats, fetchListings, fetchActivites, fetchHolderStats } from '../utils/api';
import Navbar from '../components/Navbar';

const CollectionPage = () => {
  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  const { data: listings, refetch: refetchListings } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  const { data: activities, refetch: refetchActivities } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivites,
  });

  const { data: holderStats, refetch: refetchHolderStats } = useQuery({
    queryKey: ['holderStats'],
    queryFn: fetchHolderStats,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchStats();
      refetchListings();
      refetchActivities();
      refetchHolderStats();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval);
  }, [refetchStats, refetchListings, refetchActivities, refetchHolderStats]);

  if (!stats || !listings || !activities || !holderStats) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Collection Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-6 shadow-md">
          <h1 className="text-4xl font-bold mb-2">Tatsumeeko: Meekolony Pass</h1>
          <p className="text-lg">
            Floor Price: <span className="font-semibold">{stats.data.floorPrice / 1_000_000_000} SOL</span>
          </p>
          <p className="text-lg">
            Unique Holders: <span className="font-semibold">{holderStats.data.uniqueHolders}</span>
          </p>
        </div>

        {/* Recent Listings */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {listings.data.map((listing) => (
              <div key={listing.token.mintAddress} className="bg-white border rounded-lg shadow-md p-4">
                <div className="relative w-full h-48">
                  <img
                    src={listing.token.image}
                    alt={listing.token.name}
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mt-2">{listing.token.name}</h3>
                <p className="text-gray-600">Price: {listing.price} SOL</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Sales */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Sales</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {activities.data.map((sale, index) => (
              <div
                key={index}
                className="border-b py-4 last:border-b-0 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <p>
                    <strong>Transaction Type:</strong> {sale.type}
                  </p>
                  <p>
                    <strong>Price:</strong> {sale.price} SOL
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Buyer:</strong> <span className="break-words">{sale.buyer || 'N/A'}</span>
                  </p>
                  <p>
                    <strong>Seller:</strong> <span className="break-words">{sale.seller || 'N/A'}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Signature:</strong>{' '}
                    <a
                      href={`https://explorer.solana.com/tx/${sale.signature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-words"
                    >
                      {sale.signature}
                    </a>
                  </p>
                  <p>
                    <strong>Block Time:</strong>{' '}
                    {new Date(sale.blockTime * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CollectionPage;
