# Publicação no GitHub e Vercel

## 1. Preparar o Git

No diretório do projeto:

```bash
pnpm install
pnpm check
pnpm build:vercel

git init
git add .
git commit -m "Preparar landing page Ilha do Tavares para deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Se o repositório Git já existir, substitua os comandos `git init` e `git remote add` pelos dados do seu repositório.

## 2. Publicar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) e entre com sua conta.
2. Escolha **Import Git Repository** e selecione o repositório.
3. Confirme estas configurações:
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm build:vercel`
   - **Output Directory:** `dist/public`
   - **Install Command:** `pnpm install`
4. Clique em **Deploy**.

O arquivo `vercel.json` já contém essas configurações e a regra de rewrite necessária para a navegação SPA.

## 3. Deploy pela CLI (opcional)

```bash
pnpm dlx vercel login
pnpm dlx vercel --prod
```

A Vercel pedirá a confirmação do projeto e da conta no primeiro deploy.

## Observações

As imagens usadas pelo site foram copiadas para `client/public/assets`, portanto o projeto não depende do armazenamento privado do Manus para funcionar no GitHub ou na Vercel. Não há variáveis de ambiente obrigatórias para esta landing page estática. O formulário abre o WhatsApp diretamente no navegador e não exige backend.
