# Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [License](#license)

# Project Description

NFT Monitor App is built to help users monitor NFT sales data in real-time. It fetches data from the Magic Eden API, allowing users to view recent sales, analyze trends, and explore detailed sales history for Meekolony NFTs and collections.

# Features

- View recent listings and sales of Meekolony NFT collections.
- Listings and sales update every 5 minutes.
- View NFTs by inputting the wallet address.
- Responsive design for seamless use on various devices.

# Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **API**: Magic Eden API
- **State Management**: React Query

# Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Zyd98/nft-monitor-app.git
   cd nft-monitor-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```plaintext
   NEXT_PUBLIC_API_URL=https://api-mainnet.magiceden.dev/v2
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

# Database Schema

Below is a proposed schema to efficiently store and query historical sales data, along with a plan for populating and maintaining it, and some potential use cases.

**Tables**

*Sales*

- id (Primary Key): Unique identifier for each sale.

- transaction_id: Unique identifier for the transaction.

- collection_id: Foreign key referencing the id in the Collections table, identifying the NFT collection.

- nft_mint_address: Foreign key referencing the mint_address in the NFTs table, identifying the specific NFT sold.

- buyer_id: Foreign key referencing the id in the Users table, identifying the buyer.

- seller_id: Foreign key referencing the id in the Users table, identifying the seller.

- price: Sale price of the NFT.

- currency: Currency used for the transaction (e.g., SOL, ETH).

- timestamp: Date and time of the sale.

- block_time: Blockchain timestamp of the transaction.

- signature: Blockchain transaction signature.


*NFTs*

- mint_address (Primary Key): Unique blockchain address for each NFT.

- collection_id: Foreign key referencing the id in the Collections table, associating the NFT with its collection.
  
- name: Name of the NFT.

- image_url: URL to the NFT image.

- metadata: JSON or structured data containing additional metadata.


*Collections*

- id (Primary Key): Unique identifier for each collection.

- name: Name of the collection.

- symbol: Symbol of the collection.

- description: Description of the collection.


*Users*
  
- id (Primary Key): Unique identifier for each user.

- wallet_address: Blockchain wallet address of the user.

- username: Optional username or alias.

**Relationships**

- Sales table references NFTs, Collections, and Users tables to provide detailed information about each sale.

**Populating and Updating the Database**
- Initial Data Load: Use the Magic Eden API or similar sources to fetch historical sales data and populate the database. This can be done using a script that iterates over the API responses and inserts the data into the database.
- Regular Updates: Set up a scheduled job (e.g., a cron job) to periodically fetch new sales data from the API and update the database. This could be done every few minutes or hours, depending on the volume of sales and the need for up-to-date information.
Webhooks: If the API supports webhooks, use them to receive real-time updates about new sales and update the database accordingly.

**Use Cases and Performance Considerations**
- Query Recent Sales: Users may want to see the most recent sales for a collection. This can be efficiently handled by indexing the timestamp column in the Sales table and querying for the latest entries.
- Aggregate Sales Data: Users may want to see total sales volume, average price, or other aggregate metrics. Indexing the collection_id and price columns can help optimize these queries.
- User-Specific Sales History: Users may want to see their own sales or purchases. Indexing the buyer_id and seller_id columns will make these queries faster.
- NFT-Specific Sales History: Users may want to see the sales history of a specific NFT. Indexing the nft_mint_address column will support these queries.
- Real-Time Updates: For real-time dashboards, ensure that the database can handle frequent updates without locking or performance degradation. Consider using a database that supports high write throughput, like MySQL or a NoSQL database like MongoDB, depending on the specific needs.

**Performance Optimization**
- Indexes: Create indexes on frequently queried columns such as timestamp, collection_id, buyer_id, seller_id, and nft_mint_address.
- Partitioning: For very large datasets, consider partitioning the Sales table by date or collection to improve query performance.
- Caching: Use caching strategies for frequently accessed data to reduce database load and improve response times.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

