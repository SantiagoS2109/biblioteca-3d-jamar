import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/auth/AuthProvider";
import NavBarWrapper from "@/components/NavBarWrapper";

const geomanist = localFont({
  src: [
    {
      path: "../../public/fonts/GeomanistLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeomanistRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeomanistMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeomanistBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Jamar — Biblioteca 3D",
  description: "Biblioteca de activos 3D para Jamar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${geomanist.className} `}>
        <AuthProvider>
          <Toaster reverseOrder={false} />
          <div className="font-sans min-h-screen gap-16 relative">
            <NavBarWrapper />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
