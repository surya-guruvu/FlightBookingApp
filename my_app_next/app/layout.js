import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'
// import { GlobalNav } from '@/components/GlobalNav'
import { Children } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ayrus Flight Booking App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Header/>
      {children}
      </body>
      
    </html>
  )
}

// export default function RootLayout({
//   children,
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }