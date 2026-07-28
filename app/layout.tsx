import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oliviana-imoveis.com.br"),
  title: {
    default: "Oliviana Imóveis | Imóveis e quartos para locação em São Paulo",
    template: "%s",
  },
  description:
    "Encontre imóveis e quartos para locação em regiões estratégicas de São Paulo, com informações claras e atendimento direto.",
  openGraph: {
    title: "Oliviana Imóveis",
    description:
      "Imóveis e quartos para locação em São Paulo com cuidado, clareza e atendimento direto.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliviana Imóveis",
    description:
      "Imóveis e quartos para locação em São Paulo com informações claras e atendimento direto.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
