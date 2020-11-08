FROM node:12 as builder

LABEL org.opencontainers.image.created=11/07/20
LABEL org.opencontainers.image.title="Idea-Service Dockerfile"

WORKDIR /node/app

# Copy package.json and package-lock and 
# install node_modules before copying all files
# in order to leverage better caching.
# The package-lock.json file will be ignored if
# it does not exist.
COPY package.json package-lock.json* ./

# For logging purposes
RUN npm config list 

# Install production dependencies in /node_modules
RUN npm install --silent && npm cache clean --force

# Copy the entire app, with all TS files
COPY . .
RUN chmod 755 ./wait-for-container.sh

# Transpile TS to JS in /dist
RUN npm run build


# Use Debian for final image instead of Alpine.
# Debian works better with image scanning tools.
# Alpine is used above for faster build and then discarded.
FROM builder as prod

EXPOSE 3000

# jq is required for the ./uninstall-dev script
RUN apt-get update && \ 
    apt-get install -y jq

# Uninstall dev dependencies.
# They are not needed for production image
RUN ./uninstall-dev.sh

# Install tini to /tini and give it executable permission
ADD https://github.com/krallin/tini/releases/download/v0.17.0/tini /tini
RUN chmod +x /tini

WORKDIR /var/www

# Use node user that is defined in upstream image instead of root.
# This user will be referenced when executing RUN, CMD, and ENTRYPOINT.
# Everything else will still be executed with root.
USER node

# The final image will only contain dist, node_modules, and tini.
COPY --from=builder /node/app/node_modules node_modules/
COPY --from=builder /node/app/dist dist/ 

# Use node instead of npm for better linux process signal passing
# npm does not respond to SIGINT/SIGTERM for graceful shutdown
# node can be configured to respond to SIGINIT/SIGTERM
# We use "tini" for signal response, but "tini" does not handle graceful shutdown
# Custom code can be added for better handle graceful shutdown
# Without tini, linux will kill the container after 10 seconds of waiting
# We want to prevent killing containers on production servers during rolling updates
ENTRYPOINT [ "/tini", "--" ]
CMD [ "node", "./dist/main" ]