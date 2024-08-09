import React, { useState } from 'react'
import { CheckpointType } from '../lib/schema'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

interface FarmerFormProps {
  checkpoint: CheckpointType
  onSubmit: (farmerAddress: Address, checkpoint: CheckpointType, data: any) => void
  onCancel: () => void
}

const FarmerForm: React.FC<FarmerFormProps> = ({ checkpoint, onSubmit, onCancel }) => {
  const { address, isConnected }=useAccount();
  const [formData, setFormData] = useState<any>({})
  const [files, setFiles] = useState<{ [key: string]: File | null }>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles({ ...files, [field]: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !address) {
        alert("Please connect your wallet first.")
        return
      }
    const currentTimestamp = Math.floor(Date.now() / 1000)
    let dataToSubmit = {
      ...formData,
      timestamp: currentTimestamp,
    }

    for (const [field, file] of Object.entries(files)) {
      if (file) {
        const base64String = await convertFileToBase64(file)
        dataToSubmit[field] = base64String
      }
    }

    onSubmit(address, checkpoint, dataToSubmit)
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const renderFormFields = () => {
    switch (checkpoint) {
      case 'PRE_SOWING':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="soilTestReport" className="block text-sm font-medium text-gray-700 mb-1">Soil Test Report (PNG)</label>
              <input
                id="soilTestReport"
                type="file"
                accept=".png"
                onChange={(e) => handleFileChange(e, 'soilTestReport')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="landPreparationDetails" className="block text-sm font-medium text-gray-700 mb-1">Land Preparation Details</label>
              <textarea
                id="landPreparationDetails"
                value={formData.landPreparationDetails || ''}
                onChange={(e) => setFormData({...formData, landPreparationDetails: e.target.value})}
                placeholder="Describe land preparation details"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weatherForecast" className="block text-sm font-medium text-gray-700 mb-1">Weather Forecast</label>
              <input
                id="weatherForecast"
                type="text"
                value={formData.weatherForecast || ''}
                onChange={(e) => setFormData({...formData, weatherForecast: e.target.value})}
                placeholder="Enter weather forecast"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cropTypeSelected" className="block text-sm font-medium text-gray-700 mb-1">Crop Type Selected</label>
              <input
                id="cropTypeSelected"
                type="text"
                value={formData.cropTypeSelected || ''}
                onChange={(e) => setFormData({...formData, cropTypeSelected: e.target.value})}
                placeholder="Enter selected crop type"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="seedQualityCertification" className="block text-sm font-medium text-gray-700 mb-1">Seed Quality Certification (PNG)</label>
              <input
                id="seedQualityCertification"
                type="file"
                accept=".png"
                onChange={(e) => handleFileChange(e, 'seedQualityCertification')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )
      case 'MID_GROWTH':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="growthStagePhotos" className="block text-sm font-medium text-gray-700 mb-1">Growth Stage Photo (PNG)</label>
              <input
                id="growthStagePhotos"
                type="file"
                accept=".png"
                onChange={(e) => handleFileChange(e, 'growthStagePhotos')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pestDiseaseReport" className="block text-sm font-medium text-gray-700 mb-1">Pest and Disease Report</label>
              <textarea
                id="pestDiseaseReport"
                value={formData.pestDiseaseReport || ''}
                onChange={(e) => setFormData({...formData, pestDiseaseReport: e.target.value})}
                placeholder="Describe pest and disease observations"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="irrigationFertilizerLog" className="block text-sm font-medium text-gray-700 mb-1">Irrigation and Fertilizer Log</label>
              <textarea
                id="irrigationFertilizerLog"
                value={formData.irrigationFertilizerLog || ''}
                onChange={(e) => setFormData({...formData, irrigationFertilizerLog: e.target.value})}
                placeholder="Enter irrigation and fertilizer details"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weatherConditions" className="block text-sm font-medium text-gray-700 mb-1">Weather Conditions</label>
              <input
                id="weatherConditions"
                type="text"
                value={formData.weatherConditions || ''}
                onChange={(e) => setFormData({...formData, weatherConditions: e.target.value})}
                placeholder="Describe current weather conditions"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cropHealthScore" className="block text-sm font-medium text-gray-700 mb-1">Crop Health Score (0-10)</label>
              <input
                id="cropHealthScore"
                type="number"
                value={formData.cropHealthScore || ''}
                onChange={(e) => setFormData({...formData, cropHealthScore: e.target.value})}
                placeholder="Enter crop health score"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="10"
              />
            </div>
          </>
        )
      case 'PRE_HARVEST':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="cropMaturityPhoto" className="block text-sm font-medium text-gray-700 mb-1">Crop Maturity Photo (PNG)</label>
              <input
                id="cropMaturityPhoto"
                type="file"
                accept=".png"
                onChange={(e) => handleFileChange(e, 'cropMaturityPhoto')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="yieldEstimation" className="block text-sm font-medium text-gray-700 mb-1">Yield Estimation</label>
              <input
                id="yieldEstimation"
                type="number"
                value={formData.yieldEstimation || ''}
                onChange={(e) => setFormData({...formData, yieldEstimation: e.target.value})}
                placeholder="Enter estimated yield"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="qualityAssessmentReport" className="block text-sm font-medium text-gray-700 mb-1">Quality Assessment Report (PNG)</label>
              <input
                id="qualityAssessmentReport"
                type="file"
                accept=".png"
                onChange={(e) => handleFileChange(e, 'qualityAssessmentReport')}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="harvestPlanningDetails" className="block text-sm font-medium text-gray-700 mb-1">Harvest Planning Details</label>
              <textarea
                id="harvestPlanningDetails"
                value={formData.harvestPlanningDetails || ''}
                onChange={(e) => setFormData({...formData, harvestPlanningDetails: e.target.value})}
                placeholder="Describe harvest planning details"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="marketPriceAnalysis" className="block text-sm font-medium text-gray-700 mb-1">Market Price Analysis</label>
              <textarea
                id="marketPriceAnalysis"
                value={formData.marketPriceAnalysis || ''}
                onChange={(e) => setFormData({...formData, marketPriceAnalysis: e.target.value})}
                placeholder="Enter market price analysis"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  if (!checkpoint) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className=" max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">{checkpoint.replace('_', ' ')} Attestation Request</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Address</label>
        <p className="w-full p-2 border rounded bg-gray-100">{address}</p>
      </div>
      {renderFormFields()}
      <div className="mb-4">
        <label htmlFor="geolocation" className="block text-sm font-medium text-gray-700 mb-1">Geolocation</label>
        <input
          id="geolocation"
          type="text"
          value={formData.geolocation || ''}
          onChange={(e) => setFormData({...formData, geolocation: e.target.value})}
          placeholder="Enter geolocation"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          Submit Attestation Request
        </button>
        <button type="button" onClick={onCancel} className="flex-1 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default FarmerForm