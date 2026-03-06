'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center p-8'>
        <div className='text-6xl mb-4'>âš ï¸</div>
        <h2 className='text-2xl font-bold text-red-500'>Something went wrong!</h2>
        <p className='text-gray-500 mt-2'>{error.message}</p>
        <button onClick={reset} className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600'>
          Try Again
        </button>
      </div>
    </div>
  )
}
