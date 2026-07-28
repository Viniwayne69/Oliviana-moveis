import type { Metadata } from "next";
import SiteClient from "../../components/site-client";
import { properties } from "../../lib/demo-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  return {
    title: property ? `${property.title} | Oliviana Imóveis` : "Imóvel | Oliviana Imóveis",
    description: property?.description || "Detalhes do imóvel publicado pela Oliviana Imóveis.",
  };
}

export async function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  return <SiteClient page="detail" slug={slug} />;
}
