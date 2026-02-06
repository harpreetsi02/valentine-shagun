import "./globals.css";
import { Poppins, Pacifico } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${pacifico.className}`}>
        {children}
      </body>
    </html>
  );
}
