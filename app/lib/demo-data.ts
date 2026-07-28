import type { Lead, Property, SiteSettings } from "./types";

const roomOne =
  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1400&q=85";
const roomTwo =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85";
const roomThree =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85";
const kitchen =
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=85";
const living =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85";
const desk =
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=85";

export const siteSettings: SiteSettings = {
  whatsapp: "5511000000000",
  email: "oliviana.imoveis@gmail.com",
  instagram: "@olivianaimoveis",
  address: "São Paulo, SP",
  heroTitle: "Encontre seu próximo espaço em São Paulo",
  heroDescription:
    "Imóveis e quartos cuidadosamente selecionados em regiões estratégicas, com informações claras e atendimento direto em todas as etapas da locação.",
  aboutText:
    "Oliviana Martins de Lira atua na administração e locação de imóveis em São Paulo, acompanhando cada etapa do processo com organização, proximidade e transparência.",
};

export const properties: Property[] = [
  {
    id: "prop-01",
    title: "Quarto individual em Santo Amaro",
    slug: "quarto-individual-santo-amaro",
    description:
      "Conteúdo provisório para validação da interface. Quarto mobiliado em apartamento organizado, com boa iluminação, áreas comuns preparadas para o dia a dia e acesso rápido ao metrô Borba Gato.",
    neighborhood: "Santo Amaro",
    city: "São Paulo",
    approximateAddress: "Próximo ao metrô Borba Gato",
    showFullAddress: false,
    propertyType: "quarto",
    accommodationType: "quarto individual",
    monthlyPrice: 1200,
    depositValue: 1200,
    bedrooms: 1,
    bathrooms: 1,
    distanceToSubway: 8,
    availabilityDate: "2026-08-10",
    status: "disponivel",
    furnished: true,
    billsIncluded: true,
    nearSubway: true,
    featured: true,
    published: true,
    createdAt: "2026-07-24",
    views: 182,
    coverImage: roomOne,
    images: [roomOne, roomTwo, kitchen, living],
    amenities: ["Wi-Fi", "Mesa de estudos", "Guarda-roupa", "Cozinha equipada"],
    included: ["Água", "Luz", "Internet", "Limpeza das áreas comuns"],
    rules: ["Não fumante", "Uso respeitoso das áreas comuns", "Visitas combinadas"],
    contractInfo: "Contrato provisório com condições apresentadas antes da reserva.",
    depositInfo: "Caução demonstrativa equivalente a um aluguel.",
  },
  {
    id: "prop-02",
    title: "Quarto individual no Brooklin",
    slug: "quarto-individual-brooklin",
    description:
      "Conteúdo provisório para validação da interface. Ambiente mobiliado, silencioso e bem distribuído, indicado para quem busca praticidade em uma região empresarial e residencial.",
    neighborhood: "Brooklin",
    city: "São Paulo",
    approximateAddress: "Próximo ao metrô Brooklin",
    showFullAddress: false,
    propertyType: "quarto",
    accommodationType: "quarto individual",
    monthlyPrice: 1450,
    depositValue: 1450,
    bedrooms: 1,
    bathrooms: 1,
    distanceToSubway: 10,
    availabilityDate: "2026-08-20",
    status: "disponivel",
    furnished: true,
    billsIncluded: true,
    nearSubway: true,
    featured: true,
    published: true,
    createdAt: "2026-07-21",
    views: 138,
    coverImage: roomTwo,
    images: [roomTwo, desk, kitchen, living],
    amenities: ["Wi-Fi", "Cama box", "Escrivaninha", "Lavanderia"],
    included: ["Água", "Internet", "Condomínio"],
    rules: ["Não fumante", "Sem festas", "Organização compartilhada"],
    contractInfo: "Contrato demonstrativo com prazo e valores editáveis no painel.",
    depositInfo: "Caução demonstrativa informada antes da visita.",
  },
  {
    id: "prop-03",
    title: "Quarto duplo na Vila Olímpia",
    slug: "quarto-duplo-vila-olimpia",
    description:
      "Conteúdo provisório para validação da interface. Quarto amplo para duas pessoas, em imóvel mobiliado, com áreas comuns funcionais e localização estratégica.",
    neighborhood: "Vila Olímpia",
    city: "São Paulo",
    approximateAddress: "Próximo à estação Vila Olímpia",
    showFullAddress: false,
    propertyType: "quarto",
    accommodationType: "quarto compartilhado",
    monthlyPrice: 900,
    depositValue: 900,
    bedrooms: 1,
    bathrooms: 1,
    distanceToSubway: 12,
    availabilityDate: "2026-09-01",
    status: "reservado",
    furnished: true,
    billsIncluded: true,
    nearSubway: true,
    featured: true,
    published: true,
    createdAt: "2026-07-18",
    views: 96,
    coverImage: roomThree,
    images: [roomThree, living, kitchen, desk],
    amenities: ["Wi-Fi", "Armários", "Cozinha equipada", "Sala compartilhada"],
    included: ["Internet", "Condomínio", "Limpeza comum"],
    rules: ["Horário de silêncio", "Visitas sob aviso", "Não fumante"],
    contractInfo: "Contrato demonstrativo com condições editáveis.",
    depositInfo: "Caução provisória sujeita à confirmação.",
  },
  {
    id: "prop-04",
    title: "Studio mobiliado na Vila Mariana",
    slug: "studio-mobiliado-vila-mariana",
    description:
      "Conteúdo provisório para validação da interface. Studio inteiro, mobiliado e compacto, pensado para quem prefere privacidade e uma rotina simples perto do metrô.",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    approximateAddress: "Próximo ao metrô Vila Mariana",
    showFullAddress: false,
    propertyType: "apartamento",
    accommodationType: "imovel inteiro",
    monthlyPrice: 2300,
    depositValue: 2300,
    bedrooms: 1,
    bathrooms: 1,
    distanceToSubway: 7,
    availabilityDate: "2026-08-15",
    status: "disponivel",
    furnished: true,
    billsIncluded: false,
    nearSubway: true,
    featured: false,
    published: true,
    createdAt: "2026-07-14",
    views: 221,
    coverImage: living,
    images: [living, kitchen, roomOne, desk],
    amenities: ["Mobiliado", "Cozinha compacta", "Área de trabalho", "Portaria"],
    included: ["Condomínio"],
    rules: ["Contrato individual", "Sem sublocação", "Regras do condomínio"],
    contractInfo: "Contrato do imóvel inteiro apresentado após contato inicial.",
    depositInfo: "Caução demonstrativa equivalente a um aluguel.",
  },
  {
    id: "prop-05",
    title: "Apartamento compacto na Vila Nova Conceição",
    slug: "apartamento-compacto-vila-nova-conceicao",
    description:
      "Conteúdo provisório para validação da interface. Apartamento claro, bem cuidado e com ambientes integrados, ideal para quem deseja morar em uma região nobre sem perder praticidade.",
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    approximateAddress: "Região da Vila Nova Conceição",
    showFullAddress: false,
    propertyType: "apartamento",
    accommodationType: "imovel inteiro",
    monthlyPrice: 3200,
    depositValue: 3200,
    bedrooms: 1,
    bathrooms: 1,
    distanceToSubway: 18,
    availabilityDate: "2026-09-05",
    status: "alugado",
    furnished: true,
    billsIncluded: false,
    nearSubway: false,
    featured: false,
    published: true,
    createdAt: "2026-07-10",
    views: 174,
    coverImage: kitchen,
    images: [kitchen, living, roomTwo, desk],
    amenities: ["Mobiliado", "Cozinha equipada", "Boa iluminação", "Ambientes integrados"],
    included: ["Condomínio"],
    rules: ["Regras do condomínio", "Contrato individual", "Sem festas"],
    contractInfo: "Contrato demonstrativo com condições editáveis.",
    depositInfo: "Caução provisória sujeita à confirmação.",
  },
];

export const faqs = [
  {
    question: "Quais documentos são necessários?",
    answer:
      "A lista pode variar conforme o imóvel, mas normalmente envolve documento com foto, comprovante de renda e informações para análise cadastral. Este conteúdo é provisório e editável pelo painel.",
  },
  {
    question: "A caução é obrigatória?",
    answer:
      "A caução depende das condições de cada imóvel e será informada antes de qualquer reserva.",
  },
  {
    question: "As contas estão incluídas?",
    answer:
      "Alguns imóveis incluem contas, outros não. Essa informação aparece em cada anúncio e pode ser filtrada no catálogo.",
  },
  {
    question: "Posso agendar visita?",
    answer:
      "Sim. O agendamento pode ser combinado pelo WhatsApp depois do primeiro contato.",
  },
  {
    question: "O contrato tem prazo mínimo?",
    answer:
      "O prazo é informado conforme as condições de cada imóvel, sempre antes da assinatura.",
  },
  {
    question: "Animais são permitidos?",
    answer:
      "A permissão para animais varia conforme o imóvel e as regras da casa ou condomínio.",
  },
];

export const demoLeads: Lead[] = [
  {
    id: "lead-01",
    name: "Contato demonstrativo",
    email: "morador@example.com",
    phone: "(11) 90000-0000",
    propertyId: "prop-01",
    message: "Tenho interesse em conhecer o quarto de Santo Amaro.",
    createdAt: "2026-07-28T10:00:00.000Z",
    status: "novo",
  },
];
