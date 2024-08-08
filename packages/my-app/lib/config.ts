import { ethers } from 'ethers'
import { Database, helpers } from "@tableland/sdk"
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";



const PRIVATE_KEY = process.env.PRIVATE_KEY as string

export const provider = new ethers.JsonRpcProvider("https://opt-sepolia.g.alchemy.com/v2/yjUfU9OSt23_GB8FtO_BUw67V2vU3TOo")
export const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const chainId = 11155420 // Optimism Sepolia testnet
export const db = new Database({
  signer
})

// const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020"; // Sepolia 0.26
// const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

// schemaRegistry.connect(signer);

// const schema = 'uint256 eventId, uint8 voteIndex';
// const resolverAddress = '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0'; // Sepolia 0.26
// const revocable = true;

// export const transaction = async()=>{
//   await schemaRegistry.register({
//     schema,
//     resolverAddress,
//     revocable
// })};

