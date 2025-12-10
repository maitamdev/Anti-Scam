'use client'

import { motion } from 'framer-motion'
import { Loader2, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

interface ScanAnimationProps {
  status?: 'scanning' | 'safe' | 'warning' | 'danger'
  message?: string
}

export default function ScanAnimation({ status = 'scanning', message }: ScanAnimationProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          message: message || 'Website an toàn!'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          message: message || 'Cần cảnh giác!'
        }
      case 'danger':
        return {
          icon: Shield,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          message: message || 'Nguy hiểm!'
        }
      default:
        return {
          icon: Loader2,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          message: message || 'Đang quét...'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 text-center`}
    >
      {/* Animated rings */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        {status === 'scanning' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-500/30"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut" 
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-400/30"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5 
              }}
            />
          </>
        )}
        
        {/* Center icon */}
        <div className={`absolute inset-0 flex items-center justify-center ${config.bgColor} rounded-full border-4 ${config.borderColor}`}>
          <motion.div
            animate={status === 'scanning' ? { 
              rotate: 360 
            } : { 
              scale: [1, 1.2, 1] 
            }}
            transition={status === 'scanning' ? {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            } : {
              duration: 0.5
            }}
          >
            <Icon className={`w-16 h-16 ${config.color}`} />
          </motion.div>
        </div>
      </div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-xl font-semibold ${config.color}`}
      >
        {config.message}
      </motion.p>

      {/* Scanning dots */}
      {status === 'scanning' && (
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2 
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
