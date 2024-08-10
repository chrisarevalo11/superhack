'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface FarmerData {
  textData: Record<string, string>
  images: Record<string, string>
}

export default function FarmerDataPage({ params }: { params: { id: string } }) {
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch(`/api/farmer/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch farmer data');
        }
        const data = await response.json();
        setFarmerData(data);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFarmerData();
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!farmerData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Farmer Data</h1>
        <p>Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Farmer Profile</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600 border-b pb-2">Personal Information</h2>
          <div className="space-y-3">
            {Object.entries(farmerData.textData).map(([key, value]) => (
              <p key={key} className="flex justify-between">
                <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="text-gray-900">{value}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600 border-b pb-2">Farm Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(farmerData.images).map(([key, base64]) => (
              <div key={key} className="space-y-2">
                <p className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <div className="relative h-48 w-full">
                  <Image 
                    src={`data:image/png;base64,${base64}`} 
                    alt={key} 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}