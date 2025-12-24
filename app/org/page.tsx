'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Users, Settings, BarChart3, Plus, Shield } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.tier === 'FREE' || session.user.tier === 'PRO') return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Building2 size={32} />
              Organizations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý các tổ chức và nhóm của bạn
            </p>
          </div>
          <button
            onClick={() => router.push('/org/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Tạo organization
          </button>
        </div>

        {orgs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
            <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chưa có organization nào</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tạo organization đầu tiên để quản lý team và chạy training campaigns
            </p>
            <button
              onClick={() => router.push('/org/create')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tạo organization đầu tiên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgs.map((org) => (
              <div
                key={org.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/org/${org.slug}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    org.role === 'OWNER' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    org.role === 'ADMIN' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {org.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {org.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{org.memberCount} members</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/org/${org.slug}/analytics`)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <BarChart3 size={16} />
                    Analytics
                  </button>
                  {(org.role === 'OWNER' || org.role === 'ADMIN') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/org/${org.slug}/settings`)
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {orgs.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 size={24} className="text-blue-600" />
                <h3 className="font-semibold">Total Organizations</h3>
              </div>
              <p className="text-3xl font-bold">{orgs.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users size={24} className="text-green-600" />
                <h3 className="font-semibold">Total Members</h3>
              </div>
              <p className="text-3xl font-bold">
                {orgs.reduce((sum, org) => sum + org.memberCount, 0)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={24} className="text-purple-600" />
                <h3 className="font-semibold">Admin Access</h3>
              </div>
              <p className="text-3xl font-bold">
                {orgs.filter(o => o.role === 'OWNER' || o.role === 'ADMIN').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
