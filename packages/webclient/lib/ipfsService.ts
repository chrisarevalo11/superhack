import axios from "axios";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT as string;

export async function uploadJSONToIPFS(data: any): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}

export async function getFromIPFS(hash: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://chocolate-odd-mole-398.mypinata.cloud/ipfs/${hash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching from IPFS:", error);
    throw error;
  }
}

export async function uploadFileToIPFS(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
}
