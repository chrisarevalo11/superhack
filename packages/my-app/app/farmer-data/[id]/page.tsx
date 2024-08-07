'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface FarmerData {
  textData: Record<string, string>
  images: Record<string, string>
}

export default function FarmerDataPage({ params }: { params: { id: string } }) {
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null)

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
      }
    }

    fetchFarmerData();
  }, [params.id])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Data</h1>
      {farmerData ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Text Data</h2>
            {Object.entries(farmerData.textData).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Images</h2>
            {Object.entries(farmerData.images).map(([key, base64]) => (
              <div key={key} className="mb-4">
                <p className="font-semibold">{key}</p>
                <Image 
                  src={`data:image/png;base64,${base64}`} 
                  alt={key} 
                  width={300} 
                  height={200} 
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}