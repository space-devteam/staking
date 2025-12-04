import fs from 'fs';
import path from 'path';

// Path to your JSON file
const dataFilePath = path.join(process.cwd(), 'usersAirdropData.json');
console.log(dataFilePath);

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
  const url = new URL(request.url);
  const walletAddress = url.searchParams.get('walletAddress'); 
  console.log({walletAddress})// Get walletAddress from query params

  if (!walletAddress) {
    return new Response(
      JSON.stringify({ message: 'Wallet address is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const users = readDataFromFile();
  const user = users.find((user) => user.walletAddress === walletAddress);

  if (user) {
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(
      JSON.stringify({ message: 'User not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  const { walletAddress, tasks } = body;

  if (!walletAddress || !tasks) {
    return new Response(
      JSON.stringify({ error: 'Wallet address and tasks are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const users = readDataFromFile();
  
  // Find the user or create a new user
  let user = users.find((user) => user.walletAddress === walletAddress);

  if (!user) {
    // Create a new user object if it doesn't exist
    user = {
      walletAddress,
      tasks: {
        twitter: false,
        facebook: false,
        instagram: false,
        telegram: false,
        youtube: false,
      },
    };
    users.push(user); // Add the new user to the array
  }

  // Update the user's tasks
  user.tasks = tasks;

  // Save the updated data back to the file
  writeDataToFile(users);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}