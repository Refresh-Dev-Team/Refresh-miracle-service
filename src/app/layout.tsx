import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refresh Miracle Service",
  description:
    "Empowered By faith and lead by Grace Experience the life of Revival, Miracles upon miracles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}
      <Script id="votage-chat-widget" strategy="afterInteractive">{`
          (function () {
            const button = document.createElement("button");
            button.innerHTML = "💬 Chat";
            button.style.position = "fixed";
            button.style.bottom = "20px";
            button.style.right = "20px";
            button.style.padding = "12px 18px";
            button.style.background = "#000";
            button.style.color = "#fff";
            button.style.border = "none";
            button.style.borderRadius = "30px";
            button.style.cursor = "pointer";
            button.style.zIndex = "9999";

            const iframe = document.createElement("iframe");
            iframe.src = "https://refresh-ai-one.vercel.app";
            iframe.style.position = "fixed";
            iframe.style.bottom = "40px";
            iframe.style.right = "0px";
            iframe.style.width = "380px";
            iframe.style.height = "600px";
            iframe.style.border = "none";
            iframe.style.display = "none";
            iframe.style.borderRadius = "12px";
            iframe.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            iframe.style.zIndex = "9999";

            button.onclick = () => {
              iframe.style.display =
                iframe.style.display === "none" ? "block" : "none";
            };

            document.body.appendChild(button);
            document.body.appendChild(iframe);
          })();
        `}</Script>
      </body>
    </html>
  );
}
