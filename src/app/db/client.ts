import { Account } from '../model/Account';
import { Company, Organization, Person } from '../model/Organization';
import { User } from '../model/User';
import 'reflect-metadata';
import { createConnection, EntityManager } from 'typeorm';

const secretArn = 'secretArn';
const resourceArn = 'resourceArn';
const database = 'database';

const connection = createConnection({
  type: 'aurora-data-api',
  secretArn,
  resourceArn,
  database,
  region: 'us-east-1',
  entities: [
    User,
    Organization,
    Person,
    Company,
    Account
  ],
  // don't use this in production - otherwise you can lose production data.
  // dropSchema: true,
  // don't use this in production - otherwise you can lose production data.
  synchronize: true,
  // serviceConfigOptions: { endpoint: process.env.DB_ENDPOINT },
  // logging: true,
});

const client = async () => {
  const db = await connection;

  return {
    createQueryBuilder: db.createQueryBuilder,
    transaction: <T>(runInTransaction: (entityManager: EntityManager) => Promise<T>) => db.transaction(runInTransaction),
    accountRepository: db.getRepository(Account),
    userRepository: db.getRepository(User),
    organizationRepository: db.getRepository(Organization),
  };
};

export { client };
