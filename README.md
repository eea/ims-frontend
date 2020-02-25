# Volto Starter Kit (EEA Add-ons)

This is both a [Github template repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) that will allow you to easily
boostrap a new `Volto Frontend` project and also a developmnet environment for existing and new `EEA Volto Add-ons`


## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).


## Try it

1. Install [Docker](https://docs.docker.com/install/)
1. Install [Docker Compose](https://docs.docker.com/compose/install/)
1. Start:

        $ git checkout https://github.com/eea/volto-starter-kit.git volto-frontend
        $ cd volto-frontend

        $ docker-compose pull
        $ docker-compose up -d

1. Go to `http://localhost:8080` [Advanced](http://localhost:8080/@@plone-addsite?site_id=Plone&advanced=1):
   * Add `Plone` site with add-ons enabled (**user:** `admin`, **password:** `admin`):
     * `eea.restapi`
     * `kitconcept.voltodemo`

1. See application at http://localhost:8000


## Development

1. Install `nvm`

        $ touch ~/.bash_profile
        $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

        $ source ~/.bash_profile
        $ nvm version

1. Install latest `NodeJS 10.x`:

        $ nvm install 10
        $ nvm use 10
        $ node -v
        v10.19.0

1. Install `yarn`

        $ curl -o- -L https://yarnpkg.com/install.sh | bash
        $ yarn -v

1. Install and run `mrs-develop`

        $ npm -g i mrs-develop
        $ missdev

1. Activate `develop` add-ons

        $ make activate-all

1. Install

        $ npm install

1. Start backend

         $ docker-compose up -d

   * Go to `http://localhost:8080` [Advanced](http://localhost:8080/@@plone-addsite?site_id=Plone&advanced=1):
   * Add `Plone` site with add-ons enabled (**user:** `admin`, **password:** `admin`):
     * `eea.restapi`
     * `kitconcept.voltodemo`

1. Start frontend

        $ yarn start

1. See application at http://localhost:3000
