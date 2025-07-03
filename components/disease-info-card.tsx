
import { InfoIcon, HeartPulseIcon, ShieldIcon, AlertTriangleIcon } from "lucide-react"

export default function DiseaseInfoCard({
  diseaseInfo,
  isLoading
}: {
  diseaseInfo: {
    name?: string
    description?: string
    treatment?: string[]
    prevention?: string[]
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

  if (diseaseInfo?.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertTriangleIcon className="h-5 w-5" />
          <h3 className="font-medium">Error detecting disease</h3>
        </div>
        <p className="text-red-700">{diseaseInfo.error}</p>
      </div>
    )
  }

  if (!diseaseInfo?.name) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-green-600">
          <ShieldIcon className="h-5 w-5" />
          <h3 className="font-medium">No diseases detected</h3>
        </div>
        <p className="mt-2 text-green-700">Your plant appears to be healthy!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-red-800">{diseaseInfo.name}</h2>
        </div>
        {diseaseInfo.confidence && (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
            {Math.round(diseaseInfo.confidence * 100)}% confidence
          </span>
        )}
      </div>

      {diseaseInfo.description && (
        <p className="mt-4 text-gray-700">{diseaseInfo.description}</p>
      )}

      {diseaseInfo.treatment && diseaseInfo.treatment.length > 0 && (
        <div className="mt-6">
          <h3 className="flex items-center gap-2 font-semibold text-red-700">
            <HeartPulseIcon className="h-5 w-5" />
            Recommended Treatment
          </h3>
          <ul className="mt-2 space-y-2 pl-5">
            {diseaseInfo.treatment.map((treatment, index) => (
              <li key={index} className="text-gray-700 list-disc">{treatment}</li>
            ))}
          </ul>
        </div>
      )}

      {diseaseInfo.prevention && diseaseInfo.prevention.length > 0 && (
        <div className="mt-6">
          <h3 className="flex items-center gap-2 font-semibold text-green-700">
            <ShieldIcon className="h-5 w-5" />
            Prevention Tips
          </h3>
          <ul className="mt-2 space-y-2 pl-5">
            {diseaseInfo.prevention.map((prevention, index) => (
              <li key={index} className="text-gray-700 list-disc">{prevention}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}