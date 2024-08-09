import { z } from "zod";

export const SCHEMAS = {
  PRE_SOWING: {
    name: "PreSowingAttestation",
    schema:
      "address farmer, string soilFertilityReportHash, string landPreparationDetails, string weatherData, string cropTypeSelected, uint56 timestamp",
    uid: "0xfba8e38ec0f3b95fa87a0e9e4efb5bc84291f5e9198b7039d9506412730b4fa3",
  },
  MID_GROWTH: {
    name: "MidGrowthAttestation",
    schema:
      "address farmer, string growthStageReportHash, string pestDiseaseCheckHash, string waterFertilizerUsage, string weatherConditions, uint256 timestamp",
    uid: "0x...",
  },
  PRE_HARVEST: {
    name: "PreHarvestAttestation",
    schema:
      "address farmer, string cropMaturityIndicators, string yieldEstimationHash, string finalPestDiseaseStatus, string harvestPlanningDetails, uint256 timestamp",
    uid: "0x...",
  },
};

export type CheckpointType = keyof typeof SCHEMAS;

export const createProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  profilePhoto: z.string().url().optional(),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }),
  wallet: z
    .string()
    .min(42, { message: "Wallet address must be at least 42 characters." })
    .max(42, { message: "Wallet address must not exceed 42 characters." }),
});

const tagsValidation = z.string().refine((tags) => {
  const tagsArray = tags.split(",").map((tag) => tag.trim());
  return tagsArray.length <= 5 && tagsArray.every((tag) => tag.length > 0);
}, "Tags must be non-null, separated by commas, and max 5 tags.");

export const createRoundSchema = z.object({
  roundName: z
    .string()
    .min(2, { message: "Round name must be at least 2 characters." }),
  image: z.string().url().optional(),
  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters." }),
  amount: z.number().positive({ message: "Amount must be a positive number." }),
  tags: tagsValidation,
});
