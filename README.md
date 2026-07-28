# Oliviana Imóveis

Site profissional e responsivo para imóveis e quartos de locação em São Paulo, criado com React, TypeScript, Tailwind e uma camada preparada para Firebase.

## O que está pronto

- Página inicial com identidade visual inspirada no moodboard
- Catálogo com filtros, ordenação, estado vazio e carregamento progressivo
- Página individual com galeria, dados do imóvel, WhatsApp preenchido e imóveis relacionados
- Páginas de Sobre, Como funciona, Dúvidas e Contato
- Painel administrativo demonstrativo em `/admin`
- Persistência local para testes sem credenciais
- Estrutura preparada para Firebase Auth, Firestore e Storage
- SEO básico com metadados por página, sitemap, robots e dados estruturados nos imóveis

## Rodar localmente

```bash
npm install
npm run dev
```

## Firebase

Copie `.env.example` para `.env.local` e preencha as chaves públicas do seu projeto Firebase. Sem essas chaves, o site continua funcionando em modo demonstrativo usando dados locais do navegador.

## Observação sobre dados

Todos os imóveis, contatos e depoimentos iniciais são provisórios, usados apenas para validar a interface e o fluxo de navegação.
