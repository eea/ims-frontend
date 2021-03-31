FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch gosu git tmux locales-all" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $runDeps \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g yo @plone/generator-volto wait-on mrs-developer

COPY . /opt/frontend/
RUN chown -R node /opt/frontend/
WORKDIR /opt/frontend/

USER node
RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn develop \
 && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
 && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build
USER root

EXPOSE 3000 3001 4000 4001
VOLUME /opt/frontend/src/addons

ENTRYPOINT ["/opt/frontend/entrypoint.sh"]
CMD ["yarn", "start:prod"]
