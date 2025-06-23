import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './_assets/styles/globals.css'
import './_assets/styles/custom.css'
import '@radix-ui/themes/styles.css'

import { ThemeProviders } from '@/components/theme-provider'
import { Theme } from '@radix-ui/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouApp',
  description: 'Mobile WebApp of YouApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Theme>
          <ThemeProviders>
            <div className='container max-w-lg mx-auto'>
              {children}
            </div>
          </ThemeProviders>
        </Theme>
      </body>
    </html>
  )
}
