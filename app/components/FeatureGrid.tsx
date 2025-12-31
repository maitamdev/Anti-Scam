'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient?: string
}

interface Props {
  features: Feature[]
  columns?: 2 | 3 | 4
}

export default function FeatureGrid({ features, columns = 3 }: Props) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-gray-600 transition-all"
        >
          {/* Hover gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient || 'from-blue-500/10 to-cyan-500/10'} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity`} />
          
          <div className="relative z-10">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
