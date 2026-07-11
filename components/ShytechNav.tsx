'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ShytechNav() {
  const links = [
    { href: '#mesh-lab', label: 'Mesh Lab' },
    { href: '#avatar-studio', label: 'Avatar Studio' },
    { href: '#vrar-lab', label: 'VR/AR Lab' },
    { href: '#mixing-lab', label: 'Mix Lab' },
    { href: '#export', label: 'Export' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-lumina-dark/80 border-b border-white/5">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lumina-lit font-bold text-lg tracking-tight"
      >
        Lumina
      </motion.span>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-400 hover:text-lumina-lit transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
