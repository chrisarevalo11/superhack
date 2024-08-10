import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AttestationRequest {
  id: number
  farmer_address: string
  checkpoint: string
  ipfs_hash: string
  status: string
  timestamp: number
}

const AttesterDashboard: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<AttestationRequest[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    const response = await fetch('/api/attester/get/pendingRequests')
    const data = await response.json()
    if (response.status === 200) {
      setPendingRequests(data.pendingRequests)
    } else {
      console.log("Error fetching pending requests")
    }
  }

  const handleAttest = async (request: AttestationRequest) => {
    const response = await fetch('/api/attester/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: request.id,
        checkpoint: request.checkpoint,
        farmerAddress: request.farmer_address,
        ipfsHash: request.ipfs_hash,
      })
    })
    const data = await response.json()
    if (data.success) {
      alert(`Attestation created successfully. UID: ${data.attestationUID}`)
      fetchPendingRequests()
    }
  }

  const handleView = (request: AttestationRequest) => {
    router.push(`/farmer-data/${request.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Attester Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className="text-xl font-semibold bg-gray-100 p-4 border-b">Pending Attestation Requests</h3>
        <ul className="divide-y divide-gray-200">
          {pendingRequests.map((request) => (
            <li key={request.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
              <span className="text-gray-700">Farmer: {request.farmer_address.slice(0, 6)}...{request.farmer_address.slice(-4)} | Checkpoint: {request.checkpoint}</span>
              <div>
                <button
                  onClick={() => handleView(request)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 transition duration-300"
                >
                  View Data
                </button>
                <button
                  onClick={() => handleAttest(request)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Attest
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AttesterDashboard