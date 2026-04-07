import { motion } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { Shield, Star, Users, Zap, HeartHandshake } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const valueIcons = [Star, Shield, HeartHandshake, Zap, Users]

const team = [
  { name: 'Mutsinzi Innocent',   role: 'Managing Director',              img: '/images/team/Innocent.jpeg' },
  { name: 'Ngabo Justin',        role: 'Technical Director',             img: '/images/team/Justin.jpeg' },
  { name: 'Isingizwe Paccifique',role: 'Electrical Engineer',            img: '/images/team/Pacifique.jpeg' },
  { name: 'Ingabire Claudine',   role: 'Administrator',                  img: '/images/team/Claudine.jpeg' },
  { name: 'Uwayezu Emmanuel',    role: 'Plumbing & Mechanical Engineer', img: '/images/team/Emmanuel.jpeg' },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <HeroStrip title={t.about.heroTitle} />

      {/* Company Description */}
      <section className="bg-white py-16 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto text-center">
          <p className="font-body text-base text-navy/80 leading-relaxed">{t.about.companyDesc}</p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }} className="font-heading font-semibold text-navy text-2xl md:text-3xl text-center mb-10">
            {t.about.visionMission}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[t.about.vision, t.about.mission].map(({ label, text }, i) => (
              <motion.div
                key={label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <div className="w-10 h-10 rounded-btn bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-accent font-heading font-bold text-sm">{label[label.indexOf(' ') + 1]}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy text-lg mb-3">{label}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }} className="font-heading font-semibold text-navy text-2xl md:text-3xl text-center mb-10">
            {t.about.coreValues}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.about.values.map(({ title, desc }, i) => {
              const Icon = valueIcons[i]
              return (
                <motion.div
                  key={title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="bg-light-gray rounded-card p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h4 className="font-heading font-semibold text-navy text-sm mb-2">{title}</h4>
                  <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3 }} className="text-center mb-10">
            <h2 className="font-heading font-bold text-navy text-2xl md:text-3xl">{t.about.meetTeam}</h2>
            <div className="mt-3 w-12 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {team.map(({ name, role, img }, i) => (
              <motion.div
                key={name} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ duration: 0.3, delay: i * 0.07 }}
                className="group bg-white rounded-card shadow-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: '133%' }}>
                  <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-heading font-bold text-navy text-sm leading-snug">{name}</h4>
                  <p className="font-body text-xs text-muted mt-1">{t.about.roles[role]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
