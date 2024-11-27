import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchWalletNFTs } from '../../utils/api';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';

const HolderPage = () => {
  const router = useRouter();
  const { walletAddress } = router.query;

  const { data: nfts, isLoading } = useQuery({
    queryKey: ['walletNFTs', walletAddress],
    queryFn: () => fetchWalletNFTs(walletAddress),
    enabled: !!walletAddress,
  });

  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNFT(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading NFTs...</p>;
  if (!nfts || !Array.isArray(nfts.data) || nfts.data.length === 0) return <p>No NFTs found for this wallet.</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-xl sm:text-3xl font-bold mb-4">NFTs for Wallet: {walletAddress}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nfts.data.map((nft) => (
            <div
              key={nft.mintAddress}
              className="p-4 border rounded cursor-pointer"
              onClick={() => openModal(nft)}
            >
              <img src={nft.image} alt={nft.name} className="w-full h-auto" />
              <p className="text-sm sm:text-base">{nft.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} nft={selectedNFT} />
    </>
  );
};

export default HolderPage;
