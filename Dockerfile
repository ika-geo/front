# Step 1: Builder
FROM node:18.8.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .
CMD ["yarn", "run", "build"]

# Step 2: Production Image
FROM node:18.8.0

WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/build /usr/src/app/build
COPY --from=builder /usr/src/app/server /usr/src/app/server

# Install dependencies including express
RUN cd /usr/src/app/server && yarn add express

EXPOSE 3000
CMD ["node", "server/index.js"]
