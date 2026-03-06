'use client'
import React from 'react'

interface Props { children: React.ReactNode; fallback?: React.ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error } }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error('ErrorBoundary:', error, info) }
  render() {
    if (this.state.hasError) return this.props.fallback || <div className='p-8 text-center'><h2 className='text-xl font-bold text-red-500'>Something went wrong</h2><p className='text-gray-500 mt-2'>{this.state.error?.message}</p><button onClick={() => this.setState({ hasError: false })} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>Try Again</button></div>
    return this.props.children
  }
}