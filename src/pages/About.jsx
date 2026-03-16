import { motion } from 'framer-motion'
import HeroStrip from '../components/HeroStrip'
import { Shield, Star, Users, Zap, HeartHandshake } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const values = [
  {
    Icon: Star,
    title: 'Professionalism',
    desc: 'Transparency, accountability, and excellence in service delivery.',
  },
  {
    Icon: Shield,
    title: 'Quality & Safety',
    desc: 'Strict adherence to regulations and best practices.',
  },
  {
    Icon: HeartHandshake,
    title: 'Customer Focus',
    desc: "Tailored solutions for each client's unique needs.",
  },
  {
    Icon: Zap,
    title: 'Innovation',
    desc: 'Modern technologies for enhanced performance and sustainability.',
  },
  {
    Icon: Users,
    title: 'Teamwork',
    desc: 'Collaborative environment built on respect and shared goals.',
  },
]

const team = [
  { name: 'Mutsinzi Innocent', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Ngabo Justin', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Isingizwe Paccifique', role: 'Electrical Engineer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Ingabire Claudine', role: 'Administrator', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Uwayezu Emmanuel', role: 'Plumbing & Mechanical Engineer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
]

export default function About() {
  return (
    <>
      <HeroStrip title="About City Stroy Ltd" />

      {/* Company Description */}
      <section className="bg-white py-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-body text-base text-navy/80 leading-relaxed">
            City Stroy Ltd is a versatile construction and engineering company in Rwanda,
            specializing in mechanical, electrical, and civil works. We deliver high-quality
            projects from start to finish, with strong expertise in plumbing, fire fighting,
            HVAC systems, and other construction services — ensuring international standards
            of quality, safety, and sustainability.
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="font-heading font-semibold text-navy text-2xl md:text-3xl text-center mb-10"
          >
            Vision & Mission
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Our Vision',
                text: 'To become the leading provider of reliable, innovative, and energy-efficient plumbing, fire fighting, and HVAC solutions for multistory buildings across Rwanda and the East African region. We aim to be recognized for our unwavering commitment to quality, safety, and sustainability in every project we undertake.',
              },
              {
                label: 'Our Mission',
                text: 'To deliver high-performance plumbing, fire fighting, and HVAC systems that meet international standards while exceeding client expectations. We are dedicated to fostering strong partnerships through integrity, technical expertise, timely execution, and continuous improvement.',
              },
            ].map(({ label, text }, i) => (
              <motion.div
                key={label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <div className="w-10 h-10 rounded-btn bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-accent font-heading font-bold text-sm">{label[4]}</span>
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
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="font-heading font-semibold text-navy text-2xl md:text-3xl text-center mb-10"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="bg-light-gray rounded-card p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-accent" />
                </div>
                <h4 className="font-heading font-semibold text-navy text-sm mb-2">{title}</h4>
                <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-light-gray py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.3 }}
            className="font-heading font-semibold text-navy text-2xl md:text-3xl text-center mb-10"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map(({ name, role, img }, i) => (
              <motion.div
                key={name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-card">
                  <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-heading font-bold text-navy text-sm leading-snug">{name}</h4>
                <p className="font-body text-xs text-muted mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
