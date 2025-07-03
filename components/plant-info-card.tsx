import { InfoIcon, LeafIcon, DropletIcon, ScissorsIcon, ShieldOffIcon } from "lucide-react"

export default function PlantInfoCard({
  plantInfo,
  isLoading
}: {
  plantInfo: {
    name?: string
    scientificName?: string
    description?: string
    careTips?: string[]
    problems?: string[]
    confidence?: number
    error?: string
  }
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (plantInfo?.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <ShieldOffIcon className="h-5 w-5" />
          <h3 className="font-medium">Error identifying plant</h3>
        </div>
        <p className="text-red-700">{plantInfo.error}</p>
      </div>
    )
  }

  if (!plantInfo?.name) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-blue-600">
          <InfoIcon className="h-5 w-5" />
          <h3 className="font-medium">No plant identified</h3>
        </div>
        <p className="mt-2 text-blue-700">Upload a clear photo of a plant to get information</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-green-800">{plantInfo.name}</h2>
          {plantInfo.scientificName && (
            <p className="text-gray-600 italic">{plantInfo.scientificName}</p>
          )}
        </div>
        {plantInfo.confidence && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {Math.round(plantInfo.confidence * 100)}% confidence
          </span>
        )}
      </div>

      {plantInfo.description && (
        <p className="mt-4 text-gray-700">{plantInfo.description}</p>
      )}

      {plantInfo.careTips && plantInfo.careTips.length > 0 && (
        <div className="mt-6">
          <h3 className="flex items-center gap-2 font-semibold text-green-700">
            <LeafIcon className="h-5 w-5" />
            Care Tips
          </h3>
          <ul className="mt-2 space-y-2 pl-5">
            {plantInfo.careTips.map((tip, index) => (
              <li key={index} className="text-gray-700 list-disc">{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {plantInfo.problems && plantInfo.problems.length > 0 && (
        <div className="mt-6">
          <h3 className="flex items-center gap-2 font-semibold text-red-700">
            <ShieldOffIcon className="h-5 w-5" />
            Potential Problems
          </h3>
          <ul className="mt-2 space-y-2 pl-5">
            {plantInfo.problems.map((problem, index) => (
              <li key={index} className="text-gray-700 list-disc">{problem}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}