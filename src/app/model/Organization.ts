import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import type { Account } from './Account';
import { Address, addressSchema } from './Address';

export enum OrganizationType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY',
}

const organizationSchema = {
  required: ['CUIT', 'fiscalAddress'],
  properties: {
    CUIT: { type: 'string' },
    fiscalAddress: { type: 'object', ...addressSchema },
  },
};

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Organization {
  abstract readonly type: string;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  CUIT!: string;

  @Column(() => Address)
  fiscalAddress!: Address;

  @ManyToOne('Account')
  account!: Account;

  abstract displayName(): string;
}

export const personSchema = {
  required: [...organizationSchema.required, 'type', 'firstName', 'lastName'],
  properties: {
    ...organizationSchema.properties,
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    type: { const: 'PERSON' },
  },
  additionalProperties: false,
};

@ChildEntity()
export class Person extends Organization {
  readonly type = OrganizationType.PERSON;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  displayName(): string {
    return `${this.firstName}, ${this.lastName}`;
  }
}

export const companySchema = {
  required: [...organizationSchema.required, 'legalName'],
  properties: {
    ...organizationSchema.properties,
    legalName: { type: 'string' },
    type: { const: 'COMPANY' },
  },
  additionalProperties: false,
};

@ChildEntity()
export class Company extends Organization {
  readonly type = OrganizationType.COMPANY;

  @Column()
  legalName!: string;

  displayName(): string {
    return this.legalName;
  }
}
