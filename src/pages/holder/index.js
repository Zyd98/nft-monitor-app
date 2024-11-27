import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const HolderIndexPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (walletAddress) {
      router.push(`/holder/${walletAddress}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="container p-3 bg-white rounded-lg shadow-md max-w-full sm:max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-3 text-center text-blue-600">Holder Page</h1>
            <p className="text-center mb-3 text-gray-700">
              Enter a wallet address to view NFTs.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter wallet address"
                className="p-2 border border-gray-300 rounded-lg w-full mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View NFTs
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolderIndexPage;