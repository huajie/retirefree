export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
