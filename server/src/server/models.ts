import { Buyer } from "./db/Buyer";
import { ProcurementRecord } from "./db/ProcurementRecord";
import { Op, WhereOptions } from "sequelize";

type RecordSearchFilters = {
  textSearch?: string;
  buyers?: string[];
};

type QueryOptions = WhereOptions<ProcurementRecord> & {
  [Op.or]?: WhereOptions<ProcurementRecord>[]
};


/**
 * Queries the database for procurement records according to the search filters.
 */

export async function searchRecords(
  { textSearch, buyers }: RecordSearchFilters,
  offset: number,
  limit: number
): Promise<ProcurementRecord[] | undefined> {
  try {
    const whereClause: QueryOptions = {}
    if (textSearch) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${textSearch}%` } },
        { description: { [Op.like]: `%${textSearch}%` } },
      ]
    }

    if (buyers && buyers.length > 0) {
      whereClause["buyer_id"] = buyers;
    }

    return await ProcurementRecord.findAll({
      where: whereClause,
      limit,
      offset,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function getAllBuyers(): Promise<Buyer[] | undefined> {
  try {
    return await Buyer.findAll({ attributes: { include: ['id', 'name'] } });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}