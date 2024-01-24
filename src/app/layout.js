import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider"


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Instagram Clone",
  description: "Instagram Clone using Next and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
       
        </body>
    </html>
  );
}
