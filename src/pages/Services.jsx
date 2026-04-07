import { motion } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { Building2, Zap, Droplets, Flame, Route, HardHat, PaintBucket, Wrench } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const serviceIcons = [Building2, Zap, Droplets, Flame, Route, HardHat, PaintBucket, Wrench]

export default function Services() {
  const { t } = useLanguage()

  return (
    <>
      <HeroStrip title={t.services.heroTitle} subtitle={t.services.heroSub} />

      <div>
        {t.services.items.map(({ name, desc }, i) => {
          const Icon = serviceIcons[i]
          return (
            <motion.section
              key={name} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }} variants={fadeUp} transition={{ duration: 0.3 }}
              className={`py-16 px-6 ${i % 2 === 0 ? 'bg-white' : 'bg-light-gray'}`}
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-card bg-accent/10 flex items-center justify-center">
                    <Icon size={32} className="text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-semibold text-navy text-xl md:text-2xl mb-3">{name}</h2>
                  <p className="font-body text-base text-navy/70 leading-relaxed max-w-2xl">{desc}</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <span className="font-heading font-extrabold text-7xl text-mid-gray select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>
    </>
  )
}
