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
        <div className="fixed top-0 z-50 w-full bg-slate-800 text-slate-100 text-center p-1">
          USE IT OR LOSE IT 
        </div>
	<div className="">
          {children}
	</div>
      </body>
    </html>
  )
}
