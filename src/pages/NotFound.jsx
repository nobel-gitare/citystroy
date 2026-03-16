import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-light-gray flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Large decorative 404 */}
        <p className="font-heading font-extrabold text-navy/8 text-[140px] leading-none select-none">
          404
        </p>

        <div className="-mt-6">
          <h1 className="font-heading font-bold text-navy text-3xl mb-3">
            Page Not Found
          </h1>
          <p className="font-body text-muted leading-relaxed mb-8">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-5 py-2.5 border border-mid-gray text-navy rounded-btn font-body font-medium text-sm hover:bg-white transition-all duration-200"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-btn font-body font-medium text-sm hover:bg-blue-700 transition-all duration-200"
            >
              <Home size={16} /> Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
