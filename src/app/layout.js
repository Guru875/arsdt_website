import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AppLayout from '@/components/AppLayout';
import './globals.css';

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "ARSDT - Appliance Repair Service & Diagnostics Training",
  description: "Learn professional appliance repair training (TV, Washing Machine, Refrigerator, AC, Microwave, RO filter) with hands-on practice. Multi-language support (English, Tamil, Malayalam).",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
