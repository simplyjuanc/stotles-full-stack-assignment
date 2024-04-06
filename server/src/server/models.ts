import { Buyer } from "./db/Buyer";
import { ProcurementRecord } from "./db/ProcurementRecord";
import { sequelize } from "./db";

type RecordSearchFilters = {
  textSearch?: string;
  buyers?: string[];
};


/**
 * Queries the database for procurement records according to the search filters.
 */
export async function searchRecords(
  { textSearch, buyers }: RecordSearchFilters,
  offset: number,
  limit: number
): Promise<ProcurementRecord[]> {

  const isBuyers = buyers && buyers.length > 0;
  let buyerFilter = '';
  if (isBuyers) {
    // const buyerIds = buyers.map((buyer) => `'${buyer}'`).join(',');
    buyerFilter = `buyer_id IN ("${buyers.join('","')}")`;
  }

  if (textSearch) {
    return await sequelize.query(
      `
      SELECT * 
      FROM procurement_records 
      WHERE 
        (title LIKE :textSearch OR description LIKE :textSearch) 
        ${isBuyers ? ('AND ' + buyerFilter) : ''} 
      LIMIT :limit OFFSET :offset
      `,
      {
        model: ProcurementRecord, // by setting this sequelize will return a list of ProcurementRecord objects
        replacements: {
          textSearch: `%${textSearch}%`,
          offset: offset,
          limit: limit,
        },
      }
    );
  } else {
    return await sequelize.query(
      `
      SELECT * 
      FROM procurement_records 
      ${isBuyers ? ('WHERE ' + buyerFilter) : ''} 
      LIMIT :limit 
      OFFSET :offset
      `,
      {
        model: ProcurementRecord,
        replacements: {
          offset: offset,
          limit: limit,
        },
      }
    );
  }
}

export async function getAllBuyers(): Promise<Buyer[]> {
  return await Buyer.findAll({ attributes: { include: ['id', 'name'] } });
}