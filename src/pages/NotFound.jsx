import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-light-gray flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center max-w-md">
        <p className="font-heading font-extrabold text-navy/8 text-[140px] leading-none select-none">404</p>
        <div className="-mt-6">
          <h1 className="font-heading font-bold text-navy text-3xl mb-3">{t.notFound.heading}</h1>
          <p className="font-body text-muted leading-relaxed mb-8">{t.notFound.sub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-5 py-2.5 border border-mid-gray text-navy rounded-btn font-body font-medium text-sm hover:bg-white transition-all duration-200">
              <ArrowLeft size={16} /> {t.notFound.goBack}
            </button>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-btn font-body font-medium text-sm hover:bg-blue-700 transition-all duration-200">
              <Home size={16} /> {t.notFound.backHome}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
