import './globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



import Provider from '@/components/Provider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'


export const metadata = {
  title: 'AskVault',
  description: 'An app for questions & answers',
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
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
