import { Inter as InterFont } from 'next/font/google'
import { Figtree as FigtreeFont } from 'next/font/google'

export const Inter = InterFont({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const Figtree = FigtreeFont({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-figtree',
})