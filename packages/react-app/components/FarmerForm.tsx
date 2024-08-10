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
  const { address, isConnected } = useAccount();
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

  const inputClassName = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(252,255,82)] focus:border-[rgb(252,255,82)] bg-white";
  const fileInputClassName = "cursor-pointer bg-white border border-gray-300 rounded-lg py-2 px-4 inline-flex items-center hover:bg-[rgba(252,255,82,0.1)] transition duration-200";
  const buttonClassName = "flex-1 p-3 bg-[rgb(252,255,82)] text-black rounded-lg hover:bg-[rgba(252,255,82,0.8)] transition duration-200 font-semibold";
  
  const renderFormFields = () => {
    switch (checkpoint) {
      case 'PRE_SOWING':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="soilTestReport" className="block text-sm font-medium text-gray-700 mb-1">Soil Test Report (PNG)</label>
              <div className="relative">
                <input
                  id="soilTestReport"
                  type="file"
                  accept=".png"
                  onChange={(e) => handleFileChange(e, 'soilTestReport')}
                  className="hidden"
                />
                <label htmlFor="soilTestReport" className={fileInputClassName}>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Choose File
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="landPreparationDetails" className="block text-sm font-medium text-gray-700 mb-1">Land Preparation Details</label>
              <textarea
                id="landPreparationDetails"
                value={formData.landPreparationDetails || ''}
                onChange={(e) => setFormData({...formData, landPreparationDetails: e.target.value})}
                placeholder="Describe land preparation details"
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="seedQualityCertification" className="block text-sm font-medium text-gray-700 mb-1">Seed Quality Certification (PNG)</label>
              <div className="relative">
                <input
                  id="seedQualityCertification"
                  type="file"
                  accept=".png"
                  onChange={(e) => handleFileChange(e, 'seedQualityCertification')}
                  className="hidden"
                />
                <label htmlFor="seedQualityCertification" className={fileInputClassName}>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Choose File
                </label>
              </div>
            </div>
          </>
        )
      case 'MID_GROWTH':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="growthStagePhotos" className="block text-sm font-medium text-gray-700 mb-1">Growth Stage Photo (PNG)</label>
              <div className="relative">
                <input
                  id="growthStagePhotos"
                  type="file"
                  accept=".png"
                  onChange={(e) => handleFileChange(e, 'growthStagePhotos')}
                  className="hidden"
                />
                <label htmlFor="growthStagePhotos" className={fileInputClassName}>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Choose File
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="pestDiseaseReport" className="block text-sm font-medium text-gray-700 mb-1">Pest and Disease Report</label>
              <textarea
                id="pestDiseaseReport"
                value={formData.pestDiseaseReport || ''}
                onChange={(e) => setFormData({...formData, pestDiseaseReport: e.target.value})}
                placeholder="Describe pest and disease observations"
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
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
                className={inputClassName}
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
              <div className="relative">
                <input
                  id="cropMaturityPhoto"
                  type="file"
                  accept=".png"
                  onChange={(e) => handleFileChange(e, 'cropMaturityPhoto')}
                  className="hidden"
                />
                <label htmlFor="cropMaturityPhoto" className={fileInputClassName}>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Choose File
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="yieldEstimation" className="block text-sm font-medium text-gray-700 mb-1">Yield Estimation</label>
              <input
                id="yieldEstimation"
                type="number"
                value={formData.yieldEstimation || ''}
                onChange={(e) => setFormData({...formData, yieldEstimation: e.target.value})}
                placeholder="Enter estimated yield"
                className={inputClassName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="qualityAssessmentReport" className="block text-sm font-medium text-gray-700 mb-1">Quality Assessment Report (PNG)</label>
              <div className="relative">
                <input
                  id="qualityAssessmentReport"
                  type="file"
                  accept=".png"
                  onChange={(e) => handleFileChange(e, 'qualityAssessmentReport')}
                  className="hidden"
                />
                <label htmlFor="qualityAssessmentReport" className={fileInputClassName}>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Choose File
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="harvestPlanningDetails" className="block text-sm font-medium text-gray-700 mb-1">Harvest Planning Details</label>
              <textarea
                id="harvestPlanningDetails"
                value={formData.harvestPlanningDetails || ''}
                onChange={(e) => setFormData({...formData, harvestPlanningDetails: e.target.value})}
                placeholder="Describe harvest planning details"
                className={inputClassName}
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
                className={inputClassName}
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">{checkpoint.replace('_', ' ')} Attestation Request</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Address</label>
        <p className="w-full p-2 border rounded bg-[rgba(252,255,82,0.1)] text-gray-700">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
        </p>
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
          className={inputClassName}
        />
      </div>
      <div className="flex space-x-4 mt-8">
        <button 
          type="submit" 
          className={buttonClassName}
        >
          Submit 
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default FarmerForm