import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import validator from '@middy/validator';
import { Context, Handler } from './app/models';
// import { authenticate, adminAuthenticate } from './authenticate';
// import { errorHandler } from './error-handler';
// import {client} from 'app/db/client';

type Options = { inputSchema?: any; auth?: boolean; admin?: boolean };

export const mid = <I>(handler: any, { inputSchema, auth = true, admin = false }: Options = {}) =>
    middy<Handler<I, { body: unknown }>, Context>(handler)

      // .use(dbManager({ client, config: {} })) <-- The line to replace
      // .use(auth ? authenticate() : [])
      // .use(admin ? adminAuthenticate() : [])
      .use(httpHeaderNormalizer())
      .use(jsonBodyParser())
      .use(
        inputSchema
          ? validator({
              eventSchema: {
                type: 'object',
                properties: { body: { type: 'object', ...inputSchema } },
              },
            })
          : []
      )
      // .use(errorHandler(inputSchema))
      .use(cors())
      .use(
        httpResponseSerializer({
          serializers: [
            { regex: /^application\/json$/, serializer: ({ body }) => JSON.stringify(body) },
            { regex: /^text\/plain$/, serializer: ({ body }) => body },
          ],
          defaultContentType: 'application/json',
        })
      );