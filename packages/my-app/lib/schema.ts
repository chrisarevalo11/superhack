export const SCHEMAS = {
    PRE_SOWING: {
      name: "PreSowingAttestation",
      schema: "address farmer, string landPreparationDetails, string weatherData, string cropTypeSelected, string location, uint56 timestamp",
      uid: "0x8d8c9ac74e4d981841ae80dd040a0870f3956b17ebc400424942e729fe5bf5a8" // Replace with actual schema UID after registration
    },
    MID_GROWTH: {
      name: "MidGrowthAttestation",
      schema: "address farmer, string pestDiseaseReport, string irrigationFertilizerLog, string weatherConditions, uint32 cropHealthScore, string location, uint56 timestamp",
      uid: "0x414f6c986cec2e69d4fc3b12027a39e0554b6f6030b29fe1c08911b2564d0414" // Replace with actual schema UID after registration
    },
    PRE_HARVEST: {
      name: "PreHarvestAttestation",
      schema: "address farmer, uint32 yieldEstimation, string harvestPlanningDetails, string marketPriceAnalysis, string location, uint56 timestamp",
      uid: "0x945eed2588b313c52c5012325d1cf8ec3d59f901dbc1379493e114d73df9e655" // Replace with actual schema UID after registration
    }
  }
  
  export type CheckpointType = keyof typeof SCHEMAS