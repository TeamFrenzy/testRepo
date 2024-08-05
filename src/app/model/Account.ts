import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { Organization } from './Organization';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne('Organization', { cascade: true })
  @JoinColumn()
  owner!: Organization;

  @Column({ nullable: true })
  clientId?: string;

  @Column({ nullable: true })
  apiKey?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  marketplace?: string;

  @Column({ nullable: true })
  tiendaNubeId?: string;

  @Column({ default: "COMISION"})
  modeloReporte?: string;

  // SOFTDESCRIPTOR VARIABLES: 
  @Column({ nullable: true })
  maxTime?: number;

  @Column({ nullable: true })
  maxQuantity?: number;

  @Column({ nullable: true })
  emailSeller?: string;

  @Column({ nullable: true })
  templateValidated?: string;

  @Column({ nullable: true })
  clientEndpoint?: string;

  @Column({ nullable: true })
  emailTextDescription?: string;

  @Column({ nullable: true, default: false})
  notification?: boolean;

  @Column({ nullable: true, default: 0})
  minAmount?: number;

  @Column({ nullable: true })
  validationMode?: string;
}
