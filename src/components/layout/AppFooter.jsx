import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

const footerLinks = {
  quick: [
    { name: 'Home', href: '/' },
    { name: 'Explore Resources', href: '/explore' },
    { name: 'About Us', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
  social: [
    { name: 'Twitter', href: '#' },
    { name: 'GitHub', href: 'https://github.com/Nahidahamedridoy' },
    { name: 'Discord', href: 'https://discord.gg/nahidahamedridoy' },
  ]
};

export default function AppFooter() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <BrainCircuit className="text-primary-600" size={28} />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">StudyMate <span className="text-gradient">AI</span></span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Your intelligent study companion. Empowering your learning journey with advanced AI tools, intelligent study planners, and a massive library of interactive resources.
            </p>
          </div>
          
          {/* Links Sections */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-5">
              Product
            </h3>
            <ul className="space-y-4">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-5">
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-5">
              Connect
            </h3>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700 gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} StudyMate AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>Designed with ♥️ by Nahid Ahamed Ridoy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
