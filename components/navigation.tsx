'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Sun, Moon } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about-me' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setActiveSection('hero')
    setIsDark(document.documentElement.classList.contains('dark'))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const sections = ['hero', 'about-me', 'services', 'portfolio', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40',
        'transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <a
            href="#hero"
            suppressHydrationWarning
            className="text-xl sm:text-2xl lg:text-3xl font-bold font-montserrat text-primary transition-colors hover:text-primary/80 hover:scale-105 duration-300 shrink-0"
          >
            KHALID ELALFIE
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                suppressHydrationWarning
                className={cn(
                  'px-2.5 sm:px-3 lg:px-4 py-2 rounded-lg transition-all duration-300',
                  'font-medium text-xs sm:text-sm lg:text-base',
                  isMounted && activeSection === item.href.slice(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                )}
              >
                {item.label}
              </a>
            ))}

            {/* CV Button */}
            <a
              href="/cv.pdf"
              download="Khalid_Elalfie_CV.pdf"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 ml-2 sm:ml-3 lg:ml-4 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors duration-300 text-xs sm:text-sm"
              title="Download CV"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">CV</span>
            </a>

            {/* Desktop Theme Toggle */}
            <motion.button
              onClick={() => {
                const currentTheme = localStorage.getItem('theme') || 'light'
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
                localStorage.setItem('theme', newTheme)
                document.documentElement.classList.toggle('dark')
                setIsDark(!isDark)
              }}
              className="p-2 ml-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 relative"
              title="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2" suppressHydrationWarning>
            {/* Hamburger Toggle Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors z-50"
              suppressHydrationWarning
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                {/* Top line */}
                <motion.div
                  className="w-6 h-0.5 bg-primary rounded-full"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Middle line */}
                <motion.div
                  className="w-6 h-0.5 bg-primary rounded-full"
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Bottom line */}
                <motion.div
                  className="w-6 h-0.5 bg-primary rounded-full"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'absolute top-14 sm:top-16 right-3 sm:right-4 bg-background/95 backdrop-blur-md',
                    'border border-border rounded-lg shadow-lg',
                    'flex flex-col gap-1 p-2 min-w-[150px] sm:min-w-[160px]',
                    'z-40'
                  )}
                >
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      suppressHydrationWarning
                      className={cn(
                        'px-3 py-2 rounded-lg transition-all duration-300',
                        'font-medium text-xs sm:text-sm',
                        isMounted && activeSection === item.href.slice(1)
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground hover:bg-primary/10'
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="/cv.pdf"
                    download="Khalid_Elalfie_CV.pdf"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors duration-300 text-xs sm:text-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Download CV
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => {
                const currentTheme = localStorage.getItem('theme') || 'light'
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
                localStorage.setItem('theme', newTheme)
                document.documentElement.classList.toggle('dark')
                setIsDark(!isDark)
              }}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 relative"
              title="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
