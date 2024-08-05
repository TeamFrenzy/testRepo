/* eslint-disable @typescript-eslint/ban-types */
import { client } from '../app/db/client';
import { APIGatewayProxyEvent, Context as AWSContext } from 'aws-lambda';
import { User } from './model/User';
import { SQS, S3, Lambda } from 'aws-sdk';

type Event<I = {}, E = {}> = Omit<APIGatewayProxyEvent, 'body'> & { user?: User; body: I } & E;
type Context = AWSContext & { db: ReturnType<typeof client>; sqs: SQS; s3: S3; lambda: Lambda};

type Handler<I = {}, O = any, E = Event<I>> = (event: E, context: Context) => Promise<O>;

type EventAuth<I = {}> = Event<I, { user: User }>;
type AuthHandler<I = {}, O = any> = Handler<I, O, EventAuth<I>>; 