import React from 'react'

export default function AdBlock({ position, size = 'normal' }: { position: string; size?: 'hero' | 'normal' | 'sidebar' }) {
  return (
    <div className={`bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-2 border-dashed border-sky-300 dark:border-slate-600 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 hover:border-sky-400 dark:hover:border-slate-500 group ${
      size === 'hero' ? 'p-12 my-4' : size === 'sidebar' ? 'p-6 my-4' : 'p-8 my-6'
    } w-full`}>
      <div className="text-center">
        <p className={`text-sky-700 dark:text-slate-300 font-semibold ${
          size === 'hero' ? 'text-2xl' : size === 'sidebar' ? 'text-sm' : 'text-lg'
        }`}>Google AdSense Ad Block</p>
        <p className={`text-sky-600 dark:text-slate-400 mt-1 ${
          size === 'hero' ? 'text-base' : 'text-sm'
        }`}>{position}</p>
      </div>
    </div>
  )
}
