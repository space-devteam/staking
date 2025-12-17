import fs from 'fs';
import path from 'path';

// Path to your JSON file
const dataFilePath = path.join(process.cwd(), 'usersAirdropData.json');

// Read the data from the file
const readDataFromFile = () => {
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

// Write updated data to the file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

export async function GET(request) {
  // Get all users from the data file
  const users = readDataFromFile();

  // Extract only the wallet addresses
  const walletAddresses = users.map(user => user.walletAddress);

  return new Response(JSON.stringify(walletAddresses), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
