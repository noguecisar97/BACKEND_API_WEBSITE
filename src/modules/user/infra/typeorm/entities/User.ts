import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export default class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column()
  nome: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  boleto: string;

  @Column()
  painel: string;

  @Column()
  renda: number;

  @Column()
  dataRenovacao: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dataInicio: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
