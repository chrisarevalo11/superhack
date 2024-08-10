import { ethers } from 'ethers'
import { Database } from "@tableland/sdk"

const PRIVATE_KEY = process.env.PRIVATE_KEY as string

export const provider = new ethers.JsonRpcProvider("https://opt-sepolia.g.alchemy.com/v2/yjUfU9OSt23_GB8FtO_BUw67V2vU3TOo")
export const signer = new ethers.Wallet(PRIVATE_KEY, provider)

export const db = new Database({
  signer
})