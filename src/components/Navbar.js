import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Meekolony NFT Monitor</h1>
      <ul className="flex space-x-4">
        <li>
          <Link href="/collection" className="text-white hover:underline">
            Collection
          </Link>
        </li>
        <li>
          <Link href="/holder" className="text-white hover:underline">
            Holder
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
