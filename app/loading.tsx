export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#2563EB]"></div>
        <p className="mt-4 text-[#4B5563] text-lg">Loading...</p>
      </div>
    </div>
  )
}
