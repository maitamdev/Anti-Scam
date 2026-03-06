'use client'

interface PricingProps { name: string; price: string; features: string[]; popular?: boolean; cta?: string }

export function PricingCard({ name, price, features, popular, cta = 'B\u1EAFt \u0111\u1EA7u' }: PricingProps) {
  return (
    <div className={ounded-2xl p-8 border-2 + (popular ? 'border-blue-500 shadow-xl relative' : 'border-gray-200')}>
      {popular && <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full'>Ph\u1ED5 bi\u1EBFn</span>}
      <h3 className='text-xl font-bold'>{name}</h3>
      <div className='mt-4'><span className='text-4xl font-bold'>{price}</span><span className='text-gray-500'>/th\u00E1ng</span></div>
      <ul className='mt-6 space-y-3'>{features.map((f, i) => <li key={i} className='flex items-center gap-2 text-sm'><span className='text-green-500'>\u2713</span>{f}</li>)}</ul>
      <button className={w-full mt-8 py-3 rounded-xl font-medium + (popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 hover:bg-gray-200')}>{cta}</button>
    </div>
  )
}