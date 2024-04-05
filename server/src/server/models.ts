import { ProcurementRecordDto } from "./api_types";
import { Buyer } from "./db/Buyer";
import { ProcurementRecord } from "./db/ProcurementRecord";
import { sequelize } from "./db";

type RecordSearchFilters = {
  textSearch?: string;
};


/**
 * Queries the database for procurement records according to the search filters.
 */
export async function searchRecords(
  { textSearch }: RecordSearchFilters,
  offset: number,
  limit: number
): Promise<ProcurementRecord[]> {
  if (textSearch) {
    return await sequelize.query(
      "SELECT * FROM procurement_records WHERE title LIKE :textSearch OR description LIKE :textSearch LIMIT :limit OFFSET :offset",
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
      "SELECT * FROM procurement_records LIMIT :limit OFFSET :offset",
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

/**
 * Converts a DB-style ProcurementRecord object to an API type.
 * Assumes that all related objects (buyers) are prefetched upfront and passed in the `buyersById` map
 */
function serializeProcurementRecord(
  record: ProcurementRecord,
  buyersById: Map<string, Buyer>
): ProcurementRecordDto {
  const buyer = buyersById.get(record.buyer_id);
  if (!buyer) {
    throw new Error(
      `Buyer ${record.buyer_id} was not pre-fetched when loading record ${record.id}.`
    );
  }

  return {
    id: record.id,
    title: record.title,
    description: record.description,
    publishDate: record.publish_date,
    value: record.value,
    stage: record.stage,
    currency: record.currency,
    closeDate: record.close_date,
    awardDate: record.award_date,
    buyer: {
      id: buyer.id,
      name: buyer.name,
    },
  };
}

function unique<T>(items: Iterable<T>): T[] {
  return Array.from(new Set(items));
}

/**
 * Converts an array of DB-style procurement record object into API types.
 * Prefetches all the required relations.
 */
export async function serializeProcurementRecords(
  records: ProcurementRecord[]
): Promise<ProcurementRecordDto[]> {
  // Get unique buyer ids for the selected records
  const buyerIds = unique(records.map((pr) => pr.buyer_id));

  // Fetch the buyer data in one query
  const buyers = await sequelize.query(
    "SELECT * FROM buyers WHERE id IN (:buyerIds)",
    {
      model: Buyer,
      replacements: {
        buyerIds,
      },
    }
  );

  const buyersById = new Map(buyers.map((b) => [b.id, b]));
  return records.map((r) => serializeProcurementRecord(r, buyersById));
}


export async function getAllBuyers(): Promise<Buyer[]> {
  return await Buyer.findAll({ attributes: { include: ['id', 'name'] } });
}