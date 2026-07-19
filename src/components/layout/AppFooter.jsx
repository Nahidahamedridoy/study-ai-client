import Link from 'next/link';

const footerLinks = {
  quick: [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
  ],
  social: [
    { name: 'Twitter', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Discord', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ]
};

export default function AppFooter() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              StudyMate AI
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Your intelligent study companion. Empowering your learning journey with advanced AI tools, study planners, and interactive resources.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-gray-500 dark:text-gray-400">
                Email: hello@studymate.ai
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                123 AI Boulevard, Tech District<br />San Francisco, CA 94105
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Social
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} StudyMate AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
