import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SYMBOL = "meekolony";

interface NFT {
mintAddress: string;
  name: string;
  image: string;
}

interface StatsResponse {
  floorPrice: number;
}

interface Listing {
  token: {
    mintAddress: string;
    name: string;
    image: string;
  };
  price: number;
}

interface Activity {
  type: string;
  price: number;
  buyer?: string;
  seller?: string;
  signature: string;
  blockTime: number;
}

interface HolderStatsResponse {
  uniqueHolders: number;
}

export const fetchStats = (): Promise<AxiosResponse<StatsResponse>> => axios.get(`${API_BASE_URL}/collections/${SYMBOL}/stats`);
export const fetchListings = (): Promise<AxiosResponse<Listing[]>> => axios.get(`${API_BASE_URL}/collections/${SYMBOL}/listings`);
export const fetchActivites = (): Promise<AxiosResponse<Activity[]>> => axios.get(`${API_BASE_URL}/collections/${SYMBOL}/activities`);
export const fetchWalletNFTs = (walletAddress: string): Promise<AxiosResponse<NFT[]>> => axios.get(`${API_BASE_URL}/wallets/${walletAddress}/tokens`);
export const fetchHolderStats = (): Promise<AxiosResponse<HolderStatsResponse>> => axios.get(`${API_BASE_URL}/collections/${SYMBOL}/holder_stats`);
