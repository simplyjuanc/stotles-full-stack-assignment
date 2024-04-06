export type SearchRecordsRequest = {
  textSearch?: string;
  buyers?: string[];
  limit: number;
  offset: number;
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  value: number | null;
  currency: string | null;
  stage: "TENDER" | "CONTRACT";
  closeDate: string | null;
  awardDate: string | null;
  buyer: {
    id: string;
    name: string;
  };
};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

export type Buyer = {
  id: string;
  name: string;
};

class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch records", error);
      return { records: [], endOfResults: true };
    }
  }

  async getBuyers(): Promise<Buyer[]> {
    try {
      const response = await fetch("/api/buyers");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch buyers", error);
      return [];
    }
  }

}

export default new Api();
