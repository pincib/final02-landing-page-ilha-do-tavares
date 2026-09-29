# Ilha do Tavares — Pinciara

Landing page institucional da Ilha do Tavares, com foco em apresentação do ativo insular, localização na Baía de Guanabara e captação de contatos via WhatsApp.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Wouter
- pnpm

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

O servidor local usa a porta 3000 por padrão.

## Validação

```bash
pnpm check
pnpm build:vercel
```

## Publicação

O projeto está configurado para deploy estático na Vercel com `vercel.json`. Consulte [DEPLOY.md](./DEPLOY.md) para os passos de publicação no GitHub e na Vercel.

As imagens oficiais estão versionadas em `client/public/assets`, sem dependência do armazenamento privado do Manus.
