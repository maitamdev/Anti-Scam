'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Users, Heart, Github, Mail, Zap, Brain, Eye, Lock, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function AboutPage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Eye,
      title: t.aboutPage.features.urlCheck.title,
      description: t.aboutPage.features.urlCheck.desc
    },
    {
      icon: Brain,
      title: t.aboutPage.features.aiImage.title,
      description: t.aboutPage.features.aiImage.desc
    },
    {
      icon: Zap,
      title: t.aboutPage.features.quiz.title,
      description: t.aboutPage.features.quiz.desc
    },
    {
      icon: Lock,
      title: t.aboutPage.features.free.title,
      description: t.aboutPage.features.free.desc
    },
  ]

  const stats = [
    { value: '15+', label: t.aboutPage.stats.scamTypes },
    { value: '5000+', label: t.aboutPage.stats.quizQuestions },
    { value: '100%', label: t.aboutPage.stats.free },
  ]

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t.aboutPage.backToHome}</span>
          </Link>
        </div>

        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-center mb-6">
                <Image src="/logo.png" alt="ANTI-SCAM" width={80} height={80} className="rounded-2xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.aboutPage.title} <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">ANTI-SCAM</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.aboutPage.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">{t.aboutPage.mission.badge}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {t.aboutPage.mission.title}
                </h2>
                <p className="text-gray-400 mb-4">
                  {t.aboutPage.mission.desc1}
                </p>
                <p className="text-gray-400">
                  {t.aboutPage.mission.desc2}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-blue-900/10 rounded-xl p-6 text-center border border-gray-800">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 mb-16  py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.aboutPage.features.title}</h2>
              <p className="text-gray-400">{t.aboutPage.features.subtitle}</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-900/10 rounded-xl p-6 border border-gray-800"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">{t.aboutPage.disclaimer.title}</h3>
              <ul className="space-y-2 text-gray-300">
                {t.aboutPage.disclaimer.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">{t.aboutPage.cta.title}</h2>
              <p className="text-gray-400 mb-8">
                {t.aboutPage.cta.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/scan"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white"
                >
                  {t.aboutPage.cta.scanButton}
                </Link>
                <Link
                  href="/quiz"
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white border border-gray-700"
                >
                  {t.aboutPage.cta.quizButton}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
