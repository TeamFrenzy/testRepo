import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Account } from "./Account";

export const userSchema = {
  required: ["firstName", "lastName", "email", "password"],
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  additionalProperties: false,
};

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  recoverCode?: number;

  @ManyToOne(() => Account, { cascade: true })
  account!: Account;
}
