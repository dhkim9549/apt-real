import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'APT-REAL',
  description: '아파트 실거래가 비교',
}

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <body className="">
	<div className="">
          {children}
	</div>
      </body>
    </html>
  )
}
