// lib/attesterService.ts

import {
  EAS,
  SchemaEncoder,
  Offchain,
  OffchainAttestationVersion,
  OffchainConfig,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { SCHEMAS } from "./schema";
import { getPendingAttestationRequests, updateAttestationStatus,getAttestationById, getAttestationByAddress } from "./database";
import {  signer} from "./config";
import { uploadToIPFS,getFromIPFS } from "./ipfsService"; // Import fetchFromIPFS
import { Address } from "viem";
// import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";


const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021"; // Replace with the actual EAS contract address for OP Sepolia
const eas = new EAS(EAS_CONTRACT_ADDRESS);
// const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020"; 
// const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
// schemaRegistry.connect(signer);
// const schema = 'uint256 eventId, uint8 voteIndex,uint8 Jaba';
// const resolverAddress = '0x8Fa587156B31D7FBd226304B9d0DD9d14d2a2805';
// const revocable = true;

export async function getPendingRequests(){
    return await getPendingAttestationRequests();
}

export async function createAttestation(
    requestId: number,
    farmerAddress: Address,
    checkpointType: keyof typeof SCHEMAS,
    ipfsHash: string
  ) {

    console.log("hi from createAttestation",requestId);
    
    // const transaction = await schemaRegistry.register({
    //       schema,
    //       resolverAddress,
    //       revocable
    //   });
    //   try{

    // const transactionReceipt = await transaction.wait();
    // console.log(transaction,"this is transaction")
    //   }catch(error){
    //     console.log(error)
    //   }

    // const schemaRecord = await schemaRegistry.getSchema({ uid: '0x945eed2588b313c52c5012325d1cf8ec3d59f901dbc1379493e114d73df9e655' });
    // // eas.connect(signer);
    // console.log(schemaRecord)
    // console.log(signer)

    eas.connect(signer);
    const offchain=await eas.getOffchain()
    
    const schemaEncoder = new SchemaEncoder(SCHEMAS[checkpointType].schema);
    // const schemaEncoder=new SchemaEncoder(schema)
  
    const farmerInfo = async () => {
      const url = new URL('/api/attester/get/farmerInfo', 'http://localhost:4000');
      url.searchParams.set('requestId', requestId.toString());
      const response = await fetch(url.toString());
      const data = await response.json();
      console.log(data.farmerData.textData)
      return data.farmerData.textData;
    };
  
    const farmerData = await farmerInfo();
    console.log(farmerData)
  
    let encodedData;
    
    switch (checkpointType) {
      case 'PRE_SOWING':
        encodedData = schemaEncoder.encodeData([
          { name: "farmer", value: farmerAddress, type: "address" },
          { name: "landPreparationDetails", value: farmerData.landPreparationDetails, type: "string" },
          { name: "weatherData", value: farmerData.weatherForecast, type: "string" },
          { name: "cropTypeSelected", value: farmerData.cropTypeSelected, type: "string" },
          { name: "location", value: farmerData.geolocation, type: "string" },
          { name: "timestamp", value: farmerData.timestamp, type: "uint56" }
        ]);
        break;
      case 'MID_GROWTH':
        encodedData = schemaEncoder.encodeData([
          { name: "farmer", value: farmerAddress, type: "address" },
          { name: "pestDiseaseReport", value: farmerData.pestDiseaseReport, type: "string" },
          { name: "irrigationFertilizerLog", value: farmerData.irrigationFertilizerLog, type: "string" },
          { name: "weatherConditions", value: farmerData.weatherConditions, type: "string" },
          { name: "cropHealthScore", value: farmerData.cropHealthScore, type: "uint32" },
          { name: "location", value: farmerData.geolocation, type: "string" },
          { name: "timestamp", value: farmerData.timestamp, type: "uint56" }
        ]);
        break;
      case 'PRE_HARVEST':
        encodedData = schemaEncoder.encodeData([
          { name: "farmer", value: farmerAddress, type: "address" },
          { name: "yieldEstimation", value: farmerData.yieldEstimation, type: "uint32" },
          { name: "harvestPlanningDetails", value: farmerData.harvestPlanningDetails, type: "string" },
          { name: "marketPriceAnalysis", value: farmerData.marketPriceAnalysis, type: "string" },
          { name: "location", value: farmerData.geolocation, type: "string" },
          { name: "timestamp", value: farmerData.timestamp, type: "uint56" }
        ]);
        break;
      default:
        throw new Error(`Unsupported checkpoint type: ${checkpointType}`);
    }
  
    console.log(encodedData);
  
    const offchainAttestation = await offchain.signOffchainAttestation({
      recipient: farmerAddress,
      expirationTime: BigInt(0),
      time: BigInt(Math.floor(Date.now() / 1000)),
      revocable: true,
      nonce: BigInt(0),
      schema: SCHEMAS[checkpointType].uid,
      refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
      data: encodedData,
    }, signer);
    console.log(
        "attestaion made",offchainAttestation
    )
    const jsonString = JSON.stringify(offchainAttestation, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
  
    const attestationIpfsHash = await uploadToIPFS(jsonString);
    console.log("Uploaded to IPFS with hash:", attestationIpfsHash);
  
    try{
        await updateAttestationStatus(requestId, farmerAddress, "attested", attestationIpfsHash)
    }catch(error){
        console.log(error)
    }
    return offchainAttestation.uid;
  }

export async function verifyAttestationFromIPFS(farmer_address: Address) {
    console.log("hi from verifyAttestation")
   
    const attestation  = await getAttestationByAddress(farmer_address) ;
    if (!attestation) {
      throw new Error("Attestation Request not found");
    }
    if(!attestation.attestation_ipfs_hash){
        console.log("attestation not found")
        throw new Error("Attestation not found");
    }
    console.log(attestation)
    console.log("hi after fetching attestation")
    const fetchedJsonString = await getFromIPFS(String(attestation.attestation_ipfs_hash));
    
    // console.log("Fetched from IPFS:", fetchedJsonString);
    // console.log("Fetched IPFS type:", typeof fetchedJsonString);

  console.log("Fetched from IPFS:", fetchedJsonString);
  console.log("Fetched IPFS type:", typeof fetchedJsonString);

  // Convert the fetched JSON string back to an object, handling BigInt conversion
  const offchainAttestation = JSON.parse(
    JSON.stringify(fetchedJsonString),
    (key, value) => {
      if (typeof value === "string" && /^[0-9]+$/.test(value)) {
        return BigInt(value);
      }
      return value;})
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
            signer.address,
            offchainAttestation
        );
        console.log("Is the attestation valid?", isValidAttestation);
    } catch (error) {
        console.log("Verification error:", error);
    }
}

export async function getFarmerDataFromIPFS(requestId: string) {
  const id = parseInt(requestId);
  console.log("hi from getFaremreDatafromIpfs id", typeof id, id);
  const attestation = await getAttestationById(id);
  if (!attestation) {
    throw new Error("Attestation not found");
  }
  console.log("attestation data", attestation);

  const farmerData = await getFromIPFS(String(attestation.ipfs_hash));

  const textData: Record<string, string> = {};
  const images: Record<string, string> = {};

  for (const [key, value] of Object.entries(farmerData)) {
    if (typeof value === "string" && value.startsWith("data:image")) {
      images[key] = value.split(",")[1];
    } else {
      textData[key] = value as string;
    }
  }
  return { textData, images };
}
