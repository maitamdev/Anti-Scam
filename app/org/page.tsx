'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, Users, Settings, BarChart3, Plus, Shield, Sparkles, Crown, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import AnimatedCounter from '../components/AnimatedCounter'

interface Organization {
  id: string
  name: string
  slug: string
  role: 'OWNER' | 'ADMIN' | 'MEMBER'
  memberCount: number
}

export default function OrganizationDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user && (session.user.tier === 'FREE' || session.user.tier === 'PRO')) {
      router.push('/pricing?feature=organization')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user && (session.user.tier === 'BUSINESS' || session.user.tier === 'ENTERPRISE')) {
      fetchOrganizations()
    }
  }, [session])

  const fetchOrganizations = async () => {
    try {
      const res = await fetch('/api/organizations')
      const data = await res.json()
      if (data.success) {
        setOrgs(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch orgs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              <Building2 className="absolute inset-0 m-auto w-6 h-6 text-blue-400" />
            </div>
            <p className="text-gray-400">Đang tải...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session || session.user.tier === 'FREE' || session.user.tier === 'PRO') return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-3"
              >
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">Business Feature</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8 text-blue-400" />
                Organizations
              </h1>
              <p className="text-gray-400">
                Quản lý các tổ chức và nhóm của bạn
              </p>
            </div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/org/create')}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all"
            >
              <Plus className="w-5 h-5" />
              Tạo organization
            </motion.button>
          </motion.div>

          {orgs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <GlowingCard glowColor="rgba(139, 92, 246, 0.3)">
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-12 border border-purple-500/20">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Building2 className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Chưa có organization nào</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Tạo organization đầu tiên để quản lý team và chạy training campaigns
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/org/create')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg shadow-purple-500/25"
                  >
                    <Sparkles className="w-5 h-5" />
                    Tạo organization đầu tiên
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </GlowingCard>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgs.map((org, index) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowingCard glowColor="rgba(59, 130, 246, 0.3)">
                    <div
                      className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer"
                      onClick={() => router.push(`/org/${org.slug}`)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Building2 className="w-6 h-6 text-blue-400" />
                        </motion.div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          org.role === 'OWNER' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          org.role === 'ADMIN' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {org.role}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">
                        {org.name}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{org.memberCount} members</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/org/${org.slug}/analytics`)
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
                        >
                          <BarChart3 className="w-4 h-4" />
                          Analytics
                        </button>
                        {(org.role === 'OWNER' || org.role === 'ADMIN') && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/org/${org.slug}/settings`)
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                        )}
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          {orgs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <GlowingCard glowColor="rgba(59, 130, 246, 0.3)">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-6 h-6 text-blue-400" />
                    <h3 className="font-semibold text-white">Total Organizations</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter end={orgs.length} />
                  </p>
                </div>
              </GlowingCard>
              <GlowingCard glowColor="rgba(34, 197, 94, 0.3)">
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-green-400" />
                    <h3 className="font-semibold text-white">Total Members</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter end={orgs.reduce((sum, org) => sum + org.memberCount, 0)} />
                  </p>
                </div>
              </GlowingCard>
              <GlowingCard glowColor="rgba(168, 85, 247, 0.3)">
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400" />
                    <h3 className="font-semibold text-white">Admin Access</h3>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    <AnimatedCounter end={orgs.filter(o => o.role === 'OWNER' || o.role === 'ADMIN').length} />
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
