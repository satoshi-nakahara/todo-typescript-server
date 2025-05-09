# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Prismaのクライアントを生成
RUN npx prisma generate

# TypeScriptをビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]