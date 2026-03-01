'use client'

import { Mail, Phone, Briefcase, ArrowRight, Linkedin, Check } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { name, email, phone, message } = formData

    // تنسيق الرسالة
    const emailBody = `Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}`

    // إنشاء رابط mailto
    const subject = encodeURIComponent(`New Contact from ${name} - Portfolio`)
    const body = encodeURIComponent(emailBody)
    const mailtoLink = `mailto:khalid.k.elalfie@gmail.com?subject=${subject}&body=${body}`

    // فتح تطبيق البريد
    window.location.href = mailtoLink

    // إظهار رسالة النجاح
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
    setIsLoading(false)
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      aria-label="Contact us for your project"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium text-lg tracking-widest uppercase">
            Get In Touch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact info cards */}
          {[
            {
              icon: Phone,
              title: 'Phone - WhatsApp',
              content: '+965 5053 1121',
              href: 'tel:+96550531121',
            },
            {
              icon: Mail,
              title: 'Email',
              content: 'khalid.k.elalfie@gmail.com',
              href: 'mailto:khalid.k.elalfie@gmail.com',
            },
            {
              icon: Linkedin,
              title: 'LinkedIn',
              content: 'Connect with me',
              href: 'https://www.linkedin.com/in/khalidelalfie/',
            },
            {
              icon: Briefcase,
              title: 'Behance',
              content: 'View Portfolio',
              href: 'https://www.behance.net/KhalidElAlfie',
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group p-8 rounded-lg bg-card/50 dark:bg-card/30 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg font-display">{item.title}</h3>
                    <p className="text-foreground/70 group-hover:text-primary transition-colors">
                      {item.content}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Success Toast Notification */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              transition={{ duration: 0.4 }}
              className="fixed top-6 right-6 z-50 max-w-sm"
            >
              <div className="p-4 rounded-lg bg-accent/95 backdrop-blur-md border border-accent/50 shadow-xl flex items-center gap-3">
                <motion.div
                  animate={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-foreground/20">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent-foreground">
                    Opening your email client...
                  </p>
                  <p className="text-xs text-accent-foreground/70 mt-0.5">
                    Please complete sending the message from your email app.
                  </p>
                </div>
                <motion.div
                  animate={{ scaleX: 1 }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 4.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-accent-foreground/40 rounded-full origin-left"
                  style={{ width: '100%' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-lg bg-card/50 dark:bg-card/30 border border-border"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground"
              >
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Opening...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* <p className="text-xs text-foreground/50 text-center mt-4">
              Clicking send will open your default email client with the message ready to send.
            </p> */}
          </form>
        </div>
      </div>
    </section>
  )
}
