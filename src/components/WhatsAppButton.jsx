import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-card shadow-card-hover px-4 py-2.5 text-right pointer-events-none"
          >
            <p className="font-heading font-semibold text-navy text-sm">{t.whatsapp.chat}</p>
            <p className="font-body text-muted text-xs mt-0.5">+250 784 550 282</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/250784550282"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-card-hover relative"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
        <MessageCircle size={26} className="text-white relative z-10" fill="white" />
      </motion.a>
    </div>
  )
}
