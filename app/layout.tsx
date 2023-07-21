import './globals.scss'
import 'bootstrap/dist/css/bootstrap.css'



import Provider from '@/components/Provider'

export const metadata = {
  title: 'AskVault',
  description: 'Q & A app for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
