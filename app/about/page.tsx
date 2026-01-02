'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Users, Heart, Github, Mail, Zap, Brain, Eye, Lock, ArrowLeft, Award, Globe, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import AnimatedCounter from '../components/AnimatedCounter'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function AboutPage() {
  const { t, language } = useTranslation()

  const features = [
    {
      icon: Eye,
      title: t.aboutPage.features.urlCheck.title,
      description: t.aboutPage.features.urlCheck.desc,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: t.aboutPage.features.aiImage.title,
      description: t.aboutPage.features.aiImage.desc,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: t.aboutPage.features.quiz.title,
      description: t.aboutPage.features.quiz.desc,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Lock,
      title: t.aboutPage.features.free.title,
      description: t.aboutPage.features.free.desc,
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  const stats = [
    { value: 15, suffix: '+', label: t.aboutPage.stats.scamTypes },
    { value: 5000, suffix: '+', label: t.aboutPage.stats.quizQuestions },
    { value: 100, suffix: '%', label: t.aboutPage.stats.free },
  ]

  const values = [
    {
      icon: Shield,
      title: language === 'vi' ? 'Bảo vệ người dùng' : 'User Protection',
      desc: language === 'vi' ? 'Ưu tiên hàng đầu là bảo vệ người dùng khỏi các mối đe dọa trực tuyến' : 'Top priority is protecting users from online threats'
    },
    {
      icon: Globe,
      title: language === 'vi' ? 'Miễn phí cho tất cả' : 'Free for Everyone',
      desc: language === 'vi' ? 'Công cụ bảo mật nên được tiếp cận miễn phí cho mọi người' : 'Security tools should be accessible to everyone for free'
    },
    {
      icon: Award,
      title: language === 'vi' ? 'Giáo dục cộng đồng' : 'Community Education',
      desc: language === 'vi' ? 'Nâng cao nhận thức về an ninh mạng cho cộng đồng' : 'Raising cybersecurity awareness for the community'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
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
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  <Image src="/logo.png" alt="ANTI-SCAM" width={80} height={80} className="rounded-2xl relative z-10" />
                  <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.aboutPage.title} <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">ANTI-SCAM</span>
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
                  <GlowingCard key={index} glowColor="rgba(59, 130, 246, 0.3)">
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 text-center border border-gray-700/50">
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                    </div>
                  </GlowingCard>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{language === 'vi' ? 'Giá trị cốt lõi' : 'Core Values'}</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-gray-700/50 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 mb-16 py-16">
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
                <GlowingCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                </GlowingCard>
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
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t.aboutPage.disclaimer.title}
              </h3>
              <ul className="space-y-3 text-gray-300">
                {t.aboutPage.disclaimer.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
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
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-gray-700/50"
            >
              <h2 className="text-3xl font-bold mb-4">{t.aboutPage.cta.title}</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                {t.aboutPage.cta.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25"
                  >
                    <Eye className="w-5 h-5" />
                    {t.aboutPage.cta.scanButton}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white border border-gray-700"
                  >
                    <Brain className="w-5 h-5" />
                    {t.aboutPage.cta.quizButton}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
