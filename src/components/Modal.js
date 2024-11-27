import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, nft }) => {
  const [showAttributes, setShowAttributes] = useState(false);

  if (!isOpen || !nft) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold">{nft.name}</h2>
        <img src={nft.image} alt={nft.name} className="w-full h-auto mb-4" />
        <p><strong>Collection:</strong> {nft.collectionName}</p>
        <p><strong>Supply:</strong> {nft.supply}</p>
        <p><strong>Primary Sale Happened:</strong> {nft.primarySaleHappened ? 'Yes' : 'No'}</p>
        <p><strong>Seller Fee:</strong> {nft.sellerFeeBasisPoints / 100}%</p>
        <p><strong>External URL:</strong> <a href={nft.externalUrl} target="_blank" rel="noopener noreferrer" className="break-words">{nft.externalUrl}</a></p>
        
        <button
          onClick={() => setShowAttributes(!showAttributes)}
          className="mt-2 mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          {showAttributes ? 'Hide Attributes' : 'Show Attributes'}
        </button>
        
        {showAttributes && (
          <div>
            <h3 className="text-lg font-bold mt-4">Attributes:</h3>
            <ul>
              {nft.attributes.map((attr, index) => (
                <li key={index}><strong>{attr.trait_type}:</strong> {attr.value}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
