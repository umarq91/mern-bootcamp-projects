import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Portal App",
  description: "a next js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        Hello World From Top 
        {children}
        Hello World From Botttom 

        </body>
    </html>
  );
}
