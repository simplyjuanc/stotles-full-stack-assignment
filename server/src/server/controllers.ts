import { RecordSearchRequest, RecordSearchResponse } from "./api_types";
import { Request, Response } from "express";
import { getAllBuyers, searchRecords } from "./models";
import { serializeProcurementRecords } from "./utils";

/**
 * This controller implements basic way to paginate through the search results.
 * It returns a `endOfResults` flag which is true when there are no more records to fetch.
 */
export async function postRecords(req: Request, res: Response) {
  try {
    const requestPayload = req.body as RecordSearchRequest;

    const { limit, offset } = requestPayload;

    if (limit === 0 || limit > 100) {
      res.status(400).json({ error: "Limit must be between 1 and 100." });
      return;
    }

    // We fetch one more record than requested.
    // If number of returned records is larger than
    // the requested limit it means there is more data than requested
    // and the client can fetch the next page.
    const records = await searchRecords(
      {
        textSearch: requestPayload.textSearch,
        buyers: requestPayload.buyers,
      },
      offset,
      limit + 1
    );

    const response: RecordSearchResponse = {
      records: await serializeProcurementRecords(
        records.slice(0, limit) // only return the number of records requested
      ),
      endOfResults: records.length <= limit, // in this case we've reached the end of results
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getBuyers(_req: Request, res: Response) {
  try {
    const buyers = await getAllBuyers();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ error });
  }
}