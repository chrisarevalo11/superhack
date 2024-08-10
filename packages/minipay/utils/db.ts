import { Database } from '@tableland/sdk';
import { ethers } from 'ethers';

const tableName = "user_verification_11155420_141";

// Function to initialize the database connection
function initDatabase() {
  console.log(process.env.PRIVATE_KEY);
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  return new Database({ signer });
}

// Function to insert a new user
export async function insertUser(userAddress: string, isVerified: boolean): Promise<{ success: boolean; error?: string }> {
  const db = initDatabase();
  const isVerifiedInt = isVerified ? 1 : 0;

  try {
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${tableName} (userAddress, isVerified) VALUES (?, ?);`)
      .bind(userAddress, isVerifiedInt)
      .run();

    await insert.txn?.wait();
    console.log(`Inserted user with address: ${userAddress}`);
    return { success: true };
  } catch (error) {
    console.error('Error inserting user:', error);
    return { success: false, error: (error as Error).message };
  }
}


// Function to read a specific user by address
export async function readUserByAddress(userAddress: string): Promise<{ success: boolean; user?: any; error?: string }> {
  const db = new Database();

  try {
    const { results } = await db
      .prepare(`SELECT * FROM ${tableName} WHERE userAddress = ?;`)
      .bind(userAddress)
      .all();

    if (results.length > 0) {
      console.log('Retrieved user:', results[0]);
      return { success: true, user: results[0] };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error reading user:', error);
    return { success: false, error: (error as Error).message };
  }
}