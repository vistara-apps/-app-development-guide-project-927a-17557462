
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return {
    title: "FitFlow Agent - AI Fitness Coach",
    description: "Your AI-powered fitness coach that adapts to you. Real-time form correction, adaptive workout plans, and proactive coaching.",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/frame-image.png`,
        button: {
          title: "Launch FitFlow Agent",
          action: {
            type: "launch_frame",
            name: "FitFlow Agent",
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: "#dbeafe",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
