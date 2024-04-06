import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: 'buyers', createdAt: false, updatedAt: false })
export class Buyer extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  name!: string;
}
