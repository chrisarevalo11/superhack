// lib/attesterService.ts

import { EAS, SchemaEncoder, Offchain, OffchainAttestationVersion, OffchainConfig } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { SCHEMAS } from "./schema";
import { getPendingAttestationRequests, updateAttestationStatus,getAttestationById } from "./database";
import { signer } from "./config";
import { uploadToIPFS,getFromIPFS } from "./ipfsService"; // Import fetchFromIPFS

const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021"; // Replace with the actual EAS contract address for OP Sepolia
const eas = new EAS(EAS_CONTRACT_ADDRESS);


export async function getPendingRequests(){
    return await getPendingAttestationRequests();
}

export async function createAttestation(
  requestId: number,
  farmerAddress: string,
  checkpointType: keyof typeof SCHEMAS,
  ipfsHash: string
) {
    console.log("hi from createAttestation");
    eas.connect(signer);
    //here the signer is the attester we have to change it accordingly
    //for now I have taken it from config

    const schemaEncoder = new SchemaEncoder(SCHEMAS[checkpointType].schema);
    console.log(farmerAddress);

    const encodedData = schemaEncoder.encodeData([
        { name: "farmer", value: "0x4913AbCD40a9455a28134b4ccc37f4f95225e593", type: "address" },
        { name: "soilFertilityReportHash", value: "0x204", type: "string" },
        { name: "landPreparationDetails", value: "0x204", type: "string" },
        { name: "weatherData", value: "0x204", type: "string" },
        { name: "cropTypeSelected", value: "hi", type: "string" },
        { name: "timestamp", value: 10, type: "uint56" }
    ]);

    console.log(encodedData);

    const offchain = await eas.getOffchain();

    const offchainAttestation = await offchain.signOffchainAttestation({
        recipient: "0x4913AbCD40a9455a28134b4ccc37f4f95225e593",
        expirationTime: BigInt(0),
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true,
        nonce: BigInt(0),
        schema: SCHEMAS[checkpointType].uid,
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
    }, signer);

    const jsonString = JSON.stringify(offchainAttestation, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );

    // Upload to IPFS
    const attestationIpfsHash = await uploadToIPFS(jsonString);
    console.log("Uploaded to IPFS with hash:", attestationIpfsHash);

    // Optionally update the database with the new status and attestation IPFS hash
    await updateAttestationStatus(requestId, farmerAddress, "attested", attestationIpfsHash)

    return offchainAttestation.uid;
}

export async function verifyAttestationFromIPFS(ipfsHash: string, farmer_address: string) {
    // Fetch the JSON string back from IPFS
    const fetchedJsonString = await getFromIPFS(ipfsHash);
    
    console.log("Fetched from IPFS:", fetchedJsonString);
    console.log("Fetched IPFS type:", typeof fetchedJsonString);

    // Convert the fetched JSON string back to an object, handling BigInt conversion
    const offchainAttestation = JSON.parse(JSON.stringify(fetchedJsonString), (key, value) => {
        if (typeof value === 'string' && /^[0-9]+$/.test(value)) {
            return BigInt(value);
        }
        return value;
    });

    console.log("Reconstructed offchainAttestation:", offchainAttestation);

    // Prepare EAS config for verification
    const EAS_CONFIG: OffchainConfig = {
        address: offchainAttestation.domain.verifyingContract,
        version: offchainAttestation.domain.version,
        chainId: offchainAttestation.domain.chainId,
    };

    const offchain = new Offchain(EAS_CONFIG, OffchainAttestationVersion.Version2, eas);

    // Verify the attestation
    try {
        const isValidAttestation = offchain.verifyOffchainAttestationSignature(
            farmer_address,
            offchainAttestation
        );
        console.log("Is the attestation valid?", isValidAttestation);
    } catch (error) {
        console.log("Verification error:", error);
    }
}

export async function getFarmerDataFromIPFS(requestId: string) {
    const id=parseInt(requestId)
    console.log("hi from getFaremreDatafromIpfs id",typeof(id),id)
    const attestation  = await getAttestationById(id) ;
    if (!attestation) {
      throw new Error("Attestation not found");
    }
    console.log("attestation data",attestation)
  
    const farmerData = await getFromIPFS(String(attestation.ipfs_hash));

    const textData: Record<string, string> = {};
    const images: Record<string, string> = {};
  
    for (const [key, value] of Object.entries(farmerData)) {
      if (typeof value === 'string' && value.startsWith('data:image')) {
        images[key] = value.split(',')[1];
      } else {
        textData[key] = value as string;
      }
    }
    return { textData, images };
  }
