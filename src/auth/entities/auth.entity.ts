import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mr_user')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  phone: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  is_active: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
