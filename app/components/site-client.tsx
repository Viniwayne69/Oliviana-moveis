"use client";

import {
  ArrowUpDown,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  DoorOpen,
  Edit3,
  Eye,
  Heart,
  Home,
  ImagePlus,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Users,
  Wifi,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { faqs as demoFaqs } from "../lib/demo-data";
import { loadLeads, loadProperties, loadSettings, saveLead, saveProperties, saveSettings } from "../lib/store";
import type { Lead, Property, PropertyStatus, SiteSettings } from "../lib/types";

type PageKind = "home" | "catalog" | "detail" | "about" | "process" | "faq" | "contact" | "admin";

type Props = {
  page: PageKind;
  slug?: string;
};

type Filters = {
  query: string;
  neighborhood: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  accommodation: string;
  furnished: boolean;
  nearSubway: boolean;
  billsIncluded: boolean;
  availableNow: boolean;
  sort: string;
};

const emptyFilters: Filters = {
  query: "",
  neighborhood: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
  accommodation: "",
  furnished: false,
  nearSubway: false,
  billsIncluded: false,
  availableNow: false,
  sort: "recentes",
};

const statusLabel: Record<PropertyStatus, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  alugado: "Alugado",
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function whatsappHref(settings: SiteSettings, message?: string) {
  const text =
    message ||
    "Olá, Oliviana, vi o site da Oliviana Imóveis e gostaria de receber mais informações.";
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function SiteClient({ page, slug }: Props) {
  const [properties, setProperties] = useState<Property[]>(() => loadProperties());
  const [leads, setLeads] = useState<Lead[]>(() => loadLeads());
  const [settings, setSettings] = useState<SiteSettings>(() => loadSettings());

  useEffect(() => {
    setProperties(loadProperties());
    setLeads(loadLeads());
    setSettings(loadSettings());
  }, []);

  const currentProperty = properties.find((property) => property.slug === slug);

  return (
    <div className="min-h-screen bg-[var(--warm-white)] text-[var(--graphite)]">
      {page !== "admin" ? <Header settings={settings} /> : null}
      <main>
        {page === "home" ? <HomePage properties={properties} settings={settings} /> : null}
        {page === "catalog" ? <CatalogPage properties={properties} settings={settings} /> : null}
        {page === "detail" ? (
          <PropertyDetail property={currentProperty} properties={properties} settings={settings} />
        ) : null}
        {page === "about" ? <AboutPage settings={settings} /> : null}
        {page === "process" ? <ProcessPage settings={settings} /> : null}
        {page === "faq" ? <FaqPage /> : null}
        {page === "contact" ? <ContactPage properties={properties} settings={settings} onLead={setLeads} /> : null}
        {page === "admin" ? (
          <AdminPage
            leads={leads}
            properties={properties}
            settings={settings}
            onPropertiesChange={(next) => {
              setProperties(next);
              saveProperties(next);
            }}
            onSettingsChange={(next) => {
              setSettings(next);
              saveSettings(next);
            }}
          />
        ) : null}
      </main>
      {page !== "admin" ? <Footer settings={settings} /> : null}
      {page !== "admin" ? (
        <a className="floating-whatsapp" href={whatsappHref(settings)} target="_blank" rel="noreferrer" aria-label="Falar com Oliviana pelo WhatsApp">
          <MessageCircle size={22} />
        </a>
      ) : null}
    </div>
  );
}

function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Início", "/"],
    ["Imóveis", "/imoveis"],
    ["Sobre", "/sobre"],
    ["Como funciona", "/como-funciona"],
    ["Dúvidas", "/duvidas"],
    ["Contato", "/contato"],
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Oliviana Imóveis">
        <span className="brand-mark"><Home size={22} /></span>
        <span>
          <strong>Oliviana</strong>
          <small>Imóveis</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <a className="btn btn-primary header-cta" href={whatsappHref(settings)} target="_blank" rel="noreferrer">
        <MessageCircle size={16} />
        Falar com Oliviana
      </a>
      <button className="icon-btn mobile-menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu">
        <Menu />
      </button>
      {open ? (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="drawer-panel">
            <button className="icon-btn drawer-close" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X />
            </button>
            <Link href="/" className="brand drawer-brand" onClick={() => setOpen(false)}>
              <span className="brand-mark"><Home size={20} /></span>
              <span>
                <strong>Oliviana</strong>
                <small>Imóveis</small>
              </span>
            </Link>
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <a className="btn btn-primary" href={whatsappHref(settings)} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage({ properties, settings }: { properties: Property[]; settings: SiteSettings }) {
  const featured = properties.filter((property) => property.featured && property.published).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Imóveis e quartos para locação em São Paulo</p>
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroDescription}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/imoveis">
              <Search size={17} />
              Ver imóveis disponíveis
            </Link>
            <a className="btn btn-outline" href={whatsappHref(settings)} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              Falar com a Oliviana
            </a>
          </div>
        </div>
        <div className="hero-image reveal">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=88" alt="Sala clara e acolhedora em imóvel mobiliado" />
          <div className="hero-note">
            <ShieldCheck size={20} />
            Informações claras, imóveis cuidados e atendimento direto
          </div>
        </div>
      </section>

      <QuickSearch />
      <BenefitsBand />

      <section className="section">
        <SectionTitle eyebrow="Imóveis em destaque" title="Espaços selecionados com cuidado" text="Dados demonstrativos para validar a experiência, prontos para serem substituídos pelos imóveis reais da Oliviana." />
        <div className="property-grid">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} settings={settings} />
          ))}
        </div>
        <div className="center-actions">
          <Link href="/imoveis" className="btn btn-primary">
            Ver todos os imóveis
          </Link>
        </div>
      </section>

      <section className="split-section">
        <div>
          <SectionTitle eyebrow="Por que escolher" title="Uma locação com mais clareza e presença" />
          <div className="reason-grid">
            {[
              ["Informações claras", "Cada anúncio reúne os pontos essenciais antes do primeiro contato."],
              ["Ambientes bem cuidados", "A apresentação valoriza organização, conforto e transparência."],
              ["Perto do que importa", "Filtros ajudam a encontrar regiões próximas ao metrô e serviços."],
              ["Atendimento direto", "O contato acontece com a responsável pelo acompanhamento."],
              ["Processo transparente", "As condições são organizadas antes da decisão."],
              ["Pronto para morar", "Comodidades e itens incluídos aparecem com leitura rápida."],
            ].map(([title, text]) => (
              <article key={title} className="reason-item">
                <Check size={18} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=85" alt="Mesa de trabalho em ambiente residencial iluminado" />
      </section>

      <ProcessPreview />
      <AboutPreview settings={settings} />
      <Testimonials />
      <FinalCta settings={settings} />
    </>
  );
}

function QuickSearch() {
  return (
    <section className="quick-search" aria-label="Filtros rápidos">
      <label>
        Bairro
        <select onChange={(event) => (window.location.href = `/imoveis?bairro=${event.target.value}`)}>
          <option value="">Todos</option>
          <option value="Santo Amaro">Santo Amaro</option>
          <option value="Brooklin">Brooklin</option>
          <option value="Vila Mariana">Vila Mariana</option>
        </select>
      </label>
      <label>
        Tipo de imóvel
        <select onChange={(event) => (window.location.href = `/imoveis?tipo=${event.target.value}`)}>
          <option value="">Todos</option>
          <option value="quarto">Quarto</option>
          <option value="apartamento">Apartamento</option>
        </select>
      </label>
      <label>
        Faixa de preço
        <select onChange={(event) => (window.location.href = `/imoveis?preco=${event.target.value}`)}>
          <option value="">Todas</option>
          <option value="1500">Até R$ 1.500</option>
          <option value="2500">Até R$ 2.500</option>
        </select>
      </label>
      <Link className="btn btn-primary" href="/imoveis?disponivel=1">
        Apenas disponíveis
      </Link>
    </section>
  );
}

function BenefitsBand() {
  const benefits = [
    [MapPin, "Regiões estratégicas", "Próximas ao metrô e serviços essenciais"],
    [BedDouble, "Imóveis mobiliados", "Ambientes preparados para morar"],
    [Wifi, "Contas incluídas", "Informações visíveis em cada anúncio"],
    [Users, "Atendimento direto", "Contato humano e próximo em cada etapa"],
  ];

  return (
    <section className="benefits-band">
      {benefits.map(([Icon, title, text]) => (
        <article key={String(title)}>
          <Icon size={26} />
          <div>
            <h3>{String(title)}</h3>
            <p>{String(text)}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function CatalogPage({ properties, settings }: { properties: Property[]; settings: SiteSettings }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [visible, setVisible] = useState(6);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters((current) => ({
      ...current,
      neighborhood: params.get("bairro") || "",
      propertyType: params.get("tipo") || "",
      maxPrice: params.get("preco") || "",
      availableNow: params.get("disponivel") === "1",
    }));
  }, []);

  const filtered = useMemo(() => filterProperties(properties, filters), [properties, filters]);

  return (
    <section className="catalog-page">
      <PageHero eyebrow="Catálogo" title="Imóveis disponíveis para uma escolha mais tranquila" text="Use os filtros para encontrar quartos e imóveis por bairro, preço, tipo de acomodação e itens incluídos." />
      <button className="btn btn-outline filter-mobile-trigger" onClick={() => setShowMobileFilters(true)}>
        <SlidersHorizontal size={17} />
        Filtros
      </button>
      <div className="catalog-layout">
        <PropertyFilters filters={filters} onChange={setFilters} />
        <div>
          <div className="catalog-toolbar">
            <p>{filtered.length} imóvel(is) encontrado(s)</p>
            <label>
              <ArrowUpDown size={16} />
              <select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="metro">Mais próximos do metrô</option>
              </select>
            </label>
          </div>
          {properties.length === 0 ? <LoadingSkeleton /> : null}
          {filtered.length === 0 ? <EmptyState /> : null}
          <div className="property-grid catalog-grid">
            {filtered.slice(0, visible).map((property) => (
              <PropertyCard key={property.id} property={property} settings={settings} />
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="center-actions">
              <button className="btn btn-outline" onClick={() => setVisible((value) => value + 3)}>
                Carregar mais imóveis
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {showMobileFilters ? (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="drawer-panel filter-panel-mobile">
            <button className="icon-btn drawer-close" onClick={() => setShowMobileFilters(false)} aria-label="Fechar filtros">
              <X />
            </button>
            <PropertyFilters filters={filters} onChange={setFilters} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function filterProperties(properties: Property[], filters: Filters) {
  const min = Number(filters.minPrice) || 0;
  const max = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;
  const today = new Date("2026-07-28");

  return properties
    .filter((property) => property.published)
    .filter((property) => property.title.toLowerCase().includes(filters.query.toLowerCase()) || property.neighborhood.toLowerCase().includes(filters.query.toLowerCase()))
    .filter((property) => !filters.neighborhood || property.neighborhood === filters.neighborhood)
    .filter((property) => !filters.propertyType || property.propertyType === filters.propertyType)
    .filter((property) => !filters.accommodation || property.accommodationType === filters.accommodation)
    .filter((property) => property.monthlyPrice >= min && property.monthlyPrice <= max)
    .filter((property) => !filters.furnished || property.furnished)
    .filter((property) => !filters.nearSubway || property.nearSubway)
    .filter((property) => !filters.billsIncluded || property.billsIncluded)
    .filter((property) => !filters.availableNow || (property.status === "disponivel" && new Date(property.availabilityDate) >= today))
    .sort((a, b) => {
      if (filters.sort === "menor-preco") return a.monthlyPrice - b.monthlyPrice;
      if (filters.sort === "maior-preco") return b.monthlyPrice - a.monthlyPrice;
      if (filters.sort === "metro") return a.distanceToSubway - b.distanceToSubway;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

function PropertyFilters({ filters, onChange }: { filters: Filters; onChange: (value: Filters) => void }) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="filters">
      <div className="filter-heading">
        <h2>Filtros</h2>
        <button className="link-button" onClick={() => onChange(emptyFilters)}>Limpar</button>
      </div>
      <label>
        Buscar
        <div className="input-with-icon">
          <Search size={16} />
          <input value={filters.query} onChange={(event) => update({ query: event.target.value })} placeholder="Nome ou bairro" />
        </div>
      </label>
      <label>
        Bairro
        <select value={filters.neighborhood} onChange={(event) => update({ neighborhood: event.target.value })}>
          <option value="">Todos</option>
          <option>Santo Amaro</option>
          <option>Brooklin</option>
          <option>Vila Olímpia</option>
          <option>Vila Mariana</option>
          <option>Vila Nova Conceição</option>
        </select>
      </label>
      <label>
        Tipo de imóvel
        <select value={filters.propertyType} onChange={(event) => update({ propertyType: event.target.value })}>
          <option value="">Todos</option>
          <option value="quarto">Quarto</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
        </select>
      </label>
      <div className="two-fields">
        <label>
          Valor mínimo
          <input inputMode="numeric" value={filters.minPrice} onChange={(event) => update({ minPrice: event.target.value })} placeholder="R$" />
        </label>
        <label>
          Valor máximo
          <input inputMode="numeric" value={filters.maxPrice} onChange={(event) => update({ maxPrice: event.target.value })} placeholder="R$" />
        </label>
      </div>
      <label>
        Acomodação
        <select value={filters.accommodation} onChange={(event) => update({ accommodation: event.target.value })}>
          <option value="">Todas</option>
          <option value="quarto individual">Quarto individual</option>
          <option value="quarto compartilhado">Quarto compartilhado</option>
          <option value="imovel inteiro">Imóvel inteiro</option>
        </select>
      </label>
      <CheckGroup filters={filters} onChange={update} />
    </aside>
  );
}

function CheckGroup({ filters, onChange }: { filters: Filters; onChange: (value: Partial<Filters>) => void }) {
  const items: [keyof Filters, string][] = [
    ["furnished", "Mobiliado"],
    ["nearSubway", "Próximo ao metrô"],
    ["billsIncluded", "Contas incluídas"],
    ["availableNow", "Disponível imediatamente"],
  ];

  return (
    <div className="check-group">
      {items.map(([key, label]) => (
        <label key={key} className="check-row">
          <input type="checkbox" checked={Boolean(filters[key])} onChange={(event) => onChange({ [key]: event.target.checked })} />
          {label}
        </label>
      ))}
    </div>
  );
}

function PropertyCard({ property, settings }: { property: Property; settings: SiteSettings }) {
  return (
    <article className="property-card reveal">
      <div className="card-image">
        <img src={property.coverImage} alt={`Imagem principal de ${property.title}`} loading="lazy" />
        <span className={`status status-${property.status}`}>{statusLabel[property.status]}</span>
        <button className="favorite" aria-label="Favoritar imóvel">
          <Heart size={18} />
        </button>
      </div>
      <div className="card-body">
        <p className="neighborhood">{property.neighborhood}</p>
        <h3>{property.title}</h3>
        <div className="meta-row">
          <span><MapPin size={15} /> {property.distanceToSubway} min do metrô</span>
          <span><CircleDollarSign size={15} /> {property.billsIncluded ? "Contas inclusas" : "Contas à parte"}</span>
        </div>
        <div className="price">{money.format(property.monthlyPrice)} <small>/mês</small></div>
        <div className="feature-tags">
          <span><BedDouble size={14} /> {property.bedrooms} quarto</span>
          <span><Bath size={14} /> {property.bathrooms} banheiro</span>
          {property.furnished ? <span><Home size={14} /> Mobiliado</span> : null}
        </div>
        <div className="card-actions">
          <Link className="btn btn-outline" href={`/imoveis/${property.slug}`}>
            Ver detalhes
          </Link>
          <a className="icon-link" href={whatsappHref(settings, `Olá, Oliviana, vi o imóvel ${property.title} no site da Oliviana Imóveis e gostaria de receber mais informações.`)} target="_blank" rel="noreferrer" aria-label={`Falar sobre ${property.title}`}>
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

function PropertyDetail({ property, properties, settings }: { property?: Property; properties: Property[]; settings: SiteSettings }) {
  const [selected, setSelected] = useState(0);

  if (!property) {
    return <PageHero eyebrow="Imóvel não encontrado" title="Este anúncio não está disponível" text="Volte ao catálogo para visualizar os imóveis publicados." />;
  }

  const related = properties.filter((item) => item.id !== property.id && item.neighborhood !== "").slice(0, 3);
  const message = `Olá, Oliviana, vi o imóvel ${property.title} no site da Oliviana Imóveis e gostaria de receber mais informações.`;

  return (
    <article className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: property.title,
        address: property.approximateAddress,
        image: property.coverImage,
        offers: {
          "@type": "Offer",
          price: property.monthlyPrice,
          priceCurrency: "BRL",
          availability: property.status === "disponivel" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        },
      }) }} />
      <div className="breadcrumbs">
        <Link href="/">Início</Link>
        <ChevronRight size={14} />
        <Link href="/imoveis">Imóveis</Link>
        <ChevronRight size={14} />
        <span>{property.title}</span>
      </div>
      <section className="detail-hero">
        <div className="gallery">
          <div className="gallery-main">
            <img src={property.images[selected]} alt={`Galeria de ${property.title}`} />
            <button className="gallery-nav left" onClick={() => setSelected((value) => (value === 0 ? property.images.length - 1 : value - 1))} aria-label="Imagem anterior">
              <ChevronLeft />
            </button>
            <button className="gallery-nav right" onClick={() => setSelected((value) => (value + 1) % property.images.length)} aria-label="Próxima imagem">
              <ChevronRight />
            </button>
          </div>
          <div className="thumbs">
            {property.images.map((image, index) => (
              <button key={image} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} aria-label={`Abrir imagem ${index + 1}`}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        <aside className="detail-summary">
          <span className={`status status-${property.status}`}>{statusLabel[property.status]}</span>
          <h1>{property.title}</h1>
          <p><MapPin size={17} /> {property.approximateAddress}</p>
          <div className="detail-price">{money.format(property.monthlyPrice)} <small>/mês</small></div>
          <ul className="check-list">
            {property.included.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
          </ul>
          <a className="btn btn-primary wide" href={whatsappHref(settings, message)} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            Falar sobre este imóvel no WhatsApp
          </a>
        </aside>
      </section>
      <section className="detail-content">
        <div className="detail-main">
          <SectionTitle eyebrow="Descrição" title="Informações para decidir com tranquilidade" text={property.description} />
          <InfoGrid property={property} />
          <DetailBlock title="Comodidades" items={property.amenities} />
          <DetailBlock title="O que está incluído" items={property.included} />
          <DetailBlock title="Regras do imóvel" items={property.rules} />
          <div className="info-panel">
            <h2>Caução e contrato</h2>
            <p>{property.depositInfo}</p>
            <p>{property.contractInfo}</p>
          </div>
          <div className="map-placeholder">
            <MapPin />
            <div>
              <h2>Mapa aproximado</h2>
              <p>O endereço completo não é exibido publicamente. A localização detalhada pode ser informada no atendimento, quando autorizada.</p>
            </div>
          </div>
        </div>
        <aside className="sticky-contact">
          <h2>Gostou deste espaço?</h2>
          <p>Envie uma mensagem já preenchida para conversar diretamente com a Oliviana.</p>
          <a className="btn btn-primary wide" href={whatsappHref(settings, message)} target="_blank" rel="noreferrer">Quero saber mais</a>
        </aside>
      </section>
      <section className="section">
        <SectionTitle eyebrow="Relacionados" title="Outros imóveis que podem combinar com você" />
        <div className="property-grid">
          {related.map((item) => <PropertyCard key={item.id} property={item} settings={settings} />)}
        </div>
      </section>
    </article>
  );
}

function InfoGrid({ property }: { property: Property }) {
  const items = [
    [BedDouble, `${property.bedrooms} quarto(s)`],
    [Bath, `${property.bathrooms} banheiro(s)`],
    [DoorOpen, property.accommodationType],
    [MapPin, `${property.distanceToSubway} min até o metrô`],
    [CalendarDays, `Disponível em ${new Date(property.availabilityDate).toLocaleDateString("pt-BR")}`],
    [Home, property.furnished ? "Mobiliado" : "Sem mobília"],
  ];

  return (
    <div className="info-grid">
      {items.map(([Icon, label]) => (
        <div key={String(label)}>
          <Icon size={22} />
          <span>{String(label)}</span>
        </div>
      ))}
    </div>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="detail-block">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
      </ul>
    </div>
  );
}

function AboutPage({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <PageHero eyebrow="Sobre" title="Um atendimento feito com cuidado, clareza e proximidade" text={settings.aboutText} />
      <AboutPreview settings={settings} expanded />
      <section className="section muted">
        <div className="three-columns">
          {[
            ["Forma de atendimento", "A comunicação é direta, acolhedora e objetiva, para que cada pessoa entenda as condições antes de avançar."],
            ["Compromisso com transparência", "Os anúncios são estruturados para mostrar preço, disponibilidade, itens incluídos e regras com leitura simples."],
            ["Cuidado com os imóveis", "A apresentação valoriza ambientes bem cuidados, localização e informações essenciais para uma decisão segura."],
          ].map(([title, text]) => (
            <article key={title}>
              <Sparkles size={24} />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <FinalCta settings={settings} />
    </>
  );
}

function ProcessPage({ settings }: { settings: SiteSettings }) {
  const steps = [
    ["Escolha do imóvel", "Veja fotos, valores, comodidades, regras e localização aproximada."],
    ["Contato inicial", "Fale com a Oliviana pelo WhatsApp ou envie o formulário de interesse."],
    ["Visita presencial ou virtual", "Combine a melhor forma de conhecer o espaço com calma."],
    ["Envio da documentação", "Receba a lista de documentos e as condições do imóvel escolhido."],
    ["Análise", "As informações são conferidas de forma organizada e transparente."],
    ["Contrato", "As condições são formalizadas antes da assinatura."],
    ["Pagamento", "Valores, caução e vencimentos são apresentados com clareza."],
    ["Mudança", "Com tudo alinhado, você organiza sua chegada ao novo espaço."],
  ];

  return (
    <>
      <PageHero eyebrow="Como funciona" title="Do primeiro olhar à mudança, cada etapa precisa ser simples" text="O processo foi desenhado para reduzir dúvidas, organizar informações e aproximar você do imóvel que faz sentido para sua rotina." />
      <section className="timeline-section">
        {steps.map(([title, text], index) => (
          <article key={title} className="timeline-item">
            <span>{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
      <FinalCta settings={settings} />
    </>
  );
}

function FaqPage() {
  const [open, setOpen] = useState(0);
  const extra = [
    ["Casais são aceitos?", "Depende do imóvel e da regra de ocupação cadastrada para cada espaço."],
    ["Como funciona a limpeza?", "Quando houver limpeza inclusa, a informação aparecerá no anúncio do imóvel."],
    ["Como reservar um imóvel?", "A reserva só deve acontecer depois do contato, confirmação das condições e orientação da responsável."],
  ];
  const questions = [...demoFaqs, ...extra.map(([question, answer]) => ({ question, answer }))];

  return (
    <section className="faq-page">
      <PageHero eyebrow="Dúvidas" title="Perguntas frequentes para chegar mais seguro ao primeiro contato" text="As respostas abaixo são provisórias e podem ser editadas no painel administrativo conforme as regras reais da Oliviana." />
      <div className="faq-list">
        {questions.map((item, index) => (
          <article key={item.question} className="faq-item">
            <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              {item.question}
              <ChevronDown className={open === index ? "rotate" : ""} />
            </button>
            {open === index ? <p>{item.answer}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage({ properties, settings, onLead }: { properties: Property[]; settings: SiteSettings; onLead: (value: Lead[]) => void }) {
  return (
    <>
      <PageHero eyebrow="Contato" title="Conte qual espaço chamou sua atenção" text="Envie uma mensagem com seus dados e o imóvel de interesse, ou fale diretamente pelo WhatsApp." />
      <section className="contact-layout">
        <ContactForm properties={properties} onLead={onLead} />
        <aside className="contact-card">
          <h2>Contato direto</h2>
          <p><Phone size={16} /> WhatsApp: {settings.whatsapp}</p>
          <p><Mail size={16} /> {settings.email}</p>
          <p><MapPin size={16} /> {settings.address}</p>
          <a className="btn btn-primary wide" href={whatsappHref(settings)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} />
            Falar pelo WhatsApp
          </a>
        </aside>
      </section>
    </>
  );
}

function ContactForm({ properties, onLead }: { properties: Property[]; onLead: (value: Lead[]) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", propertyId: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Informe seu nome.";
    if (form.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Informe um WhatsApp válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (form.message.trim().length < 10) nextErrors.message = "Escreva uma mensagem com um pouco mais de contexto.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    saveLead(form);
    onLead(loadLeads());
    setForm({ name: "", phone: "", email: "", propertyId: "", message: "" });
    setSuccess(true);
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <FormField label="Nome" error={errors.name}>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      </FormField>
      <FormField label="WhatsApp" error={errors.phone}>
        <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
      </FormField>
      <FormField label="E-mail" error={errors.email}>
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      </FormField>
      <FormField label="Imóvel de interesse">
        <select value={form.propertyId} onChange={(event) => setForm({ ...form, propertyId: event.target.value })}>
          <option value="">Ainda estou escolhendo</option>
          {properties.map((property) => <option key={property.id} value={property.id}>{property.title}</option>)}
        </select>
      </FormField>
      <FormField label="Mensagem" error={errors.message}>
        <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={5} />
      </FormField>
      {success ? <p className="success-message">Mensagem registrada no modo demonstrativo. Com Firebase configurado, esse contato pode ser gravado no Firestore.</p> : null}
      <button className="btn btn-primary" type="submit">Enviar contato</button>
    </form>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="form-field">
      {label}
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

function AdminPage({
  leads,
  properties,
  settings,
  onPropertiesChange,
  onSettingsChange,
}: {
  leads: Lead[];
  properties: Property[];
  settings: SiteSettings;
  onPropertiesChange: (value: Property[]) => void;
  onSettingsChange: (value: SiteSettings) => void;
}) {
  const [logged, setLogged] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  if (!logged) return <AdminLogin onLogin={() => setLogged(true)} />;

  const totals = {
    total: properties.length,
    disponiveis: properties.filter((item) => item.status === "disponivel").length,
    reservados: properties.filter((item) => item.status === "reservado").length,
    alugados: properties.filter((item) => item.status === "alugado").length,
  };

  function removeProperty(id: string) {
    onPropertiesChange(properties.filter((property) => property.id !== id));
  }

  function saveProperty(property: Property) {
    const exists = properties.some((item) => item.id === property.id);
    const next = exists ? properties.map((item) => (item.id === property.id ? property : item)) : [property, ...properties];
    onPropertiesChange(next);
    setEditing(null);
  }

  return (
    <section className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark"><Home size={20} /></span>
          <span><strong>Oliviana</strong><small>Painel</small></span>
        </Link>
        <a href="#dashboard">Dashboard</a>
        <a href="#imoveis">Imóveis</a>
        <a href="#contatos">Contatos</a>
        <a href="#site">Site</a>
      </aside>
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Painel administrativo</p>
            <h1>Gestão dos imóveis da Oliviana</h1>
          </div>
          <button className="btn btn-outline" onClick={() => setLogged(false)}>Sair</button>
        </div>
        <section id="dashboard" className="admin-cards">
          <AdminMetric label="Total de imóveis" value={totals.total} icon={<Building2 />} />
          <AdminMetric label="Disponíveis" value={totals.disponiveis} icon={<KeyRound />} />
          <AdminMetric label="Reservados" value={totals.reservados} icon={<CalendarDays />} />
          <AdminMetric label="Alugados" value={totals.alugados} icon={<ShieldCheck />} />
          <AdminMetric label="Contatos recebidos" value={leads.length} icon={<Mail />} />
          <AdminMetric label="Mais visualizados" value={Math.max(...properties.map((item) => item.views), 0)} icon={<Eye />} />
        </section>
        <section id="imoveis" className="admin-panel">
          <div className="panel-heading">
            <h2>Imóveis</h2>
            <button className="btn btn-primary" onClick={() => setEditing(newProperty())}><Plus size={17} /> Novo imóvel</button>
          </div>
          {editing ? <AdminPropertyForm property={editing} onCancel={() => setEditing(null)} onSave={saveProperty} /> : null}
          <div className="admin-table">
            {properties.map((property) => (
              <article key={property.id}>
                <img src={property.coverImage} alt="" />
                <div>
                  <h3>{property.title}</h3>
                  <p>{property.neighborhood}, {money.format(property.monthlyPrice)}</p>
                </div>
                <span className={`status status-${property.status}`}>{statusLabel[property.status]}</span>
                <button className="icon-btn" onClick={() => setEditing(property)} aria-label={`Editar ${property.title}`}><Edit3 /></button>
                <button className="icon-btn danger" onClick={() => removeProperty(property.id)} aria-label={`Excluir ${property.title}`}><Trash2 /></button>
              </article>
            ))}
          </div>
        </section>
        <section id="contatos" className="admin-panel">
          <h2>Contatos recebidos</h2>
          <div className="lead-list">
            {leads.map((lead) => (
              <article key={lead.id}>
                <h3>{lead.name}</h3>
                <p>{lead.phone} · {lead.email}</p>
                <p>{lead.message}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="site" className="admin-panel">
          <h2>Informações do site</h2>
          <SettingsForm settings={settings} onChange={onSettingsChange} />
        </section>
      </div>
    </section>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || password.length < 4) {
      setError("Use um e-mail e uma senha com pelo menos 4 caracteres para acessar o modo demonstrativo.");
      return;
    }
    onLogin();
  }

  return (
    <section className="admin-login">
      <form onSubmit={submit}>
        <Link href="/" className="brand">
          <span className="brand-mark"><Home size={20} /></span>
          <span><strong>Oliviana</strong><small>Imóveis</small></span>
        </Link>
        <h1>Acesso administrativo</h1>
        <p>Login demonstrativo local. Com Firebase configurado, esta tela passa a usar Firebase Authentication.</p>
        <label>E-mail<input value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error ? <p className="field-error">{error}</p> : null}
        <button className="btn btn-primary wide">Entrar no painel</button>
      </form>
    </section>
  );
}

function AdminMetric({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <article>
      {icon}
      <span>{value}</span>
      <p>{label}</p>
    </article>
  );
}

function newProperty(): Property {
  return {
    ...loadProperties()[0],
    id: `prop-${Date.now()}`,
    title: "Novo imóvel provisório",
    slug: "novo-imovel-provisorio",
    status: "disponivel",
    featured: false,
    views: 0,
  };
}

function AdminPropertyForm({ property, onCancel, onSave }: { property: Property; onCancel: () => void; onSave: (value: Property) => void }) {
  const [draft, setDraft] = useState(property);

  function update<K extends keyof Property>(key: K, value: Property[K]) {
    const next = { ...draft, [key]: value };
    if (key === "title") next.slug = slugify(String(value));
    setDraft(next);
  }

  return (
    <form className="admin-form" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
      <div className="two-fields">
        <label>Título<input value={draft.title} onChange={(event) => update("title", event.target.value)} /></label>
        <label>Bairro<input value={draft.neighborhood} onChange={(event) => update("neighborhood", event.target.value)} /></label>
      </div>
      <div className="three-fields">
        <label>Valor mensal<input type="number" value={draft.monthlyPrice} onChange={(event) => update("monthlyPrice", Number(event.target.value))} /></label>
        <label>Status<select value={draft.status} onChange={(event) => update("status", event.target.value as PropertyStatus)}><option value="disponivel">Disponível</option><option value="reservado">Reservado</option><option value="alugado">Alugado</option></select></label>
        <label>Distância do metrô<input type="number" value={draft.distanceToSubway} onChange={(event) => update("distanceToSubway", Number(event.target.value))} /></label>
      </div>
      <label>Descrição<textarea rows={4} value={draft.description} onChange={(event) => update("description", event.target.value)} /></label>
      <label>Imagem principal<input value={draft.coverImage} onChange={(event) => update("coverImage", event.target.value)} /></label>
      <div className="image-uploader-note"><ImagePlus size={18} /> Com Firebase Storage configurado, este campo pode receber upload e ordenação de fotos.</div>
      <div className="check-group inline">
        <label><input type="checkbox" checked={draft.featured} onChange={(event) => update("featured", event.target.checked)} /> Destaque</label>
        <label><input type="checkbox" checked={draft.published} onChange={(event) => update("published", event.target.checked)} /> Publicado</label>
        <label><input type="checkbox" checked={draft.furnished} onChange={(event) => update("furnished", event.target.checked)} /> Mobiliado</label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancelar</button>
        <button className="btn btn-primary">Salvar imóvel</button>
      </div>
    </form>
  );
}

function SettingsForm({ settings, onChange }: { settings: SiteSettings; onChange: (value: SiteSettings) => void }) {
  const [draft, setDraft] = useState(settings);

  return (
    <form className="admin-form" onSubmit={(event) => { event.preventDefault(); onChange(draft); }}>
      <div className="two-fields">
        <label>WhatsApp<input value={draft.whatsapp} onChange={(event) => setDraft({ ...draft, whatsapp: event.target.value })} /></label>
        <label>E-mail<input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label>
      </div>
      <label>Título principal<input value={draft.heroTitle} onChange={(event) => setDraft({ ...draft, heroTitle: event.target.value })} /></label>
      <label>Descrição principal<textarea rows={3} value={draft.heroDescription} onChange={(event) => setDraft({ ...draft, heroDescription: event.target.value })} /></label>
      <button className="btn btn-primary">Salvar informações</button>
    </form>
  );
}

function ProcessPreview() {
  const steps = [
    [Home, "Escolha o imóvel", "Veja o espaço que mais combina com você"],
    [Phone, "Entre em contato", "Converse diretamente com a Oliviana"],
    [ShieldCheck, "Envie documentos", "Conheça as condições com clareza"],
    [KeyRound, "Organize a mudança", "Assine o contrato e planeje a chegada"],
  ];
  return (
    <section className="process-preview">
      <SectionTitle eyebrow="Como funciona" title="Um caminho simples, do interesse à mudança" />
      <div className="steps-grid">
        {steps.map(([Icon, title, text], index) => (
          <article key={String(title)}>
            <div><Icon size={24} /></div>
            <span>{index + 1}</span>
            <h3>{String(title)}</h3>
            <p>{String(text)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPreview({ settings, expanded = false }: { settings: SiteSettings; expanded?: boolean }) {
  return (
    <section className="about-preview">
      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85" alt="Fotografia profissional provisória para Oliviana Martins de Lira" />
      <div>
        <p className="eyebrow">Sobre a Oliviana</p>
        <h2>Oliviana Martins de Lira</h2>
        <p>{settings.aboutText}</p>
        {expanded ? (
          <p>A página não inventa dados biográficos, números de experiência ou resultados. Ela cria uma base elegante para receber a história real da Oliviana quando essas informações forem fornecidas.</p>
        ) : null}
        <Link className="btn btn-outline" href="/sobre">Conheça mais sobre mim</Link>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section muted">
      <SectionTitle eyebrow="Depoimentos" title="Estrutura preparada para relatos reais" text="Os depoimentos abaixo são demonstrativos e estão marcados como conteúdo provisório." />
      <div className="testimonial-grid">
        {[
          ["Moradora provisória", "Santo Amaro", "As informações estavam organizadas e o contato foi direto, o que deixou a escolha mais tranquila."],
          ["Contato demonstrativo", "Brooklin", "Gostei de ver fotos, valor e itens incluídos em um só lugar antes de perguntar mais detalhes."],
          ["Perfil provisório", "Vila Mariana", "A experiência passa cuidado e clareza, sem parecer fria ou complicada."],
        ].map(([name, neighborhood, content]) => (
          <article className="testimonial-card" key={name}>
            <div className="testimonial-stars" aria-label="Avaliação com 5 estrelas">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p>{content}</p>
            <strong>{name}</strong>
            <span>{neighborhood}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ settings }: { settings: SiteSettings }) {
  return (
    <section className="final-cta">
      <h2>Seu próximo espaço pode estar mais perto do que você imagina</h2>
      <div>
        <Link className="btn btn-light" href="/imoveis">Ver imóveis disponíveis</Link>
        <a className="btn btn-gold" href={whatsappHref(settings)} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="skeleton-grid" aria-label="Carregando imóveis">
      {[1, 2, 3].map((item) => <div key={item} />)}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <Search size={28} />
      <h2>Nenhum imóvel encontrado</h2>
      <p>Ajuste os filtros para ampliar a busca.</p>
    </div>
  );
}

function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="brand">
          <span className="brand-mark"><Home size={20} /></span>
          <span><strong>Oliviana</strong><small>Imóveis</small></span>
        </Link>
        <p>Imóveis e quartos para locação em São Paulo, com cuidado, clareza e atendimento próximo.</p>
        <div className="socials">
          <a href="#" aria-label="Rede social"><MessageCircle /></a>
          <a href="#" aria-label="E-mail"><Mail /></a>
        </div>
      </div>
      <div>
        <h2>Navegação</h2>
        <Link href="/imoveis">Imóveis</Link>
        <Link href="/como-funciona">Como funciona</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
      </div>
      <div>
        <h2>Contato</h2>
        <p>{settings.email}</p>
        <p>{settings.address}</p>
        <a className="btn btn-gold" href={whatsappHref(settings)} target="_blank" rel="noreferrer">Falar com Oliviana</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Oliviana Imóveis. Todos os direitos reservados.</span>
        <span>Política de privacidade · Termos de uso</span>
      </div>
    </footer>
  );
}
