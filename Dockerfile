FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "start" ]
