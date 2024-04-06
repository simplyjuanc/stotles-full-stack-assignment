import { SearchRecordsRequest, ProcurementRecord, SearchRecordsResponse } from "../lib/Api";

// Mock data for SearchRecordsRequest
const mockSearchRecordsRequest: SearchRecordsRequest = {
  textSearch: 'Test',
  limit: 10,
  offset: 0,
};

// Mock data for ProcurementRecord
const mockProcurementRecords: ProcurementRecord[] = [
  {
    id: '1',
    title: 'Test Record',
    description: 'This is a test record',
    publishDate: '2022-01-01',
    value: 1000,
    currency: 'USD',
    stage: 'CONTRACT',
    closeDate: '2022-02-01',
    awardDate: '2022-01-15',
    buyer: {
      id: '1',
      name: 'Test Buyer',
    },
  }, {
    id: '2',
    title: 'Test Record 2',
    description: 'This is a test record 2',
    publishDate: '2022-02-01',
    value: 2000,
    currency: 'EUR',
    stage: 'TENDER',
    closeDate: '2022-03-01',
    awardDate: '2022-02-15',
    buyer: {
      id: '2',
      name: 'Test Buyer 2',
    },
  },
  {
    id: '3',
    title: 'Test Record 3',
    description: 'This is a test record 3',
    publishDate: '2022-03-01',
    value: 3000,
    currency: 'GBP',
    stage: 'CONTRACT',
    closeDate: '2022-04-01',
    awardDate: '2022-03-15',
    buyer: {
      id: '3',
      name: 'Test Buyer 3',
    },
  },
];


// Mock data for SearchRecordsResponse
const mockSearchRecordsResponse: SearchRecordsResponse = {
  records: mockProcurementRecords,
  endOfResults: false,
};




export {
  mockSearchRecordsRequest,
  mockProcurementRecords,
  mockSearchRecordsResponse
}