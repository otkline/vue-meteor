# ベースイメージとして node を使用
FROM node:20

# 環境変数設定
ENV METEOR_ALLOW_SUPERUSER=true

# 必要なパッケージをインストール
RUN curl https://install.meteor.com/ | sh

# 作業ディレクトリを作成
WORKDIR /app

# パッケージのインストール
COPY . /app
# RUN rm -rf package-lock.json node_module
# RUN meteor npm i
# RUN meteor npm install dotenv

# ポートを開放
EXPOSE 3000

# アプリを起動
CMD ["meteor", "run", "--port", "3000"]
