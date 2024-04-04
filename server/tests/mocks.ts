
const mockProcurementRecords = [
  {
    id: '1',
    title: 'Test Title 1',
    description: 'Test Description 1',
    publish_date: '2022-01-01',
    buyer_id: 'buyer1',
    stage: 'TENDER',
    close_date: '2022-02-01',
    award_date: '2022-02-15',
    value: 1000,
    currency: 'USD',
    created_at: '2022-01-01',
  },
  {
    id: '2',
    title: 'Test Title 2',
    description: 'Test Description 2',
    publish_date: '2022-01-02',
    buyer_id: 'buyer2',
    stage: 'CONTRACT',
    close_date: null,
    award_date: null,
    value: null,
    currency: null,
    created_at: '2022-01-02',
  },
  {
    id: '3',
    title: 'Test Title 3',
    description: 'Test Description 3',
    publish_date: '2022-01-03',
    buyer_id: 'buyer3',
    stage: 'TENDER',
    close_date: '2022-02-03',
    award_date: '2022-02-18',
    value: 1500,
    currency: 'USD',
    created_at: '2022-01-03',
  },
  {
    id: '4',
    title: 'Test Title 4',
    description: 'Test Description 4',
    publish_date: '2022-01-04',
    buyer_id: 'buyer4',
    stage: 'CONTRACT',
    close_date: null,
    award_date: null,
    value: null,
    currency: null,
    created_at: '2022-01-04',
  }
];


export { mockProcurementRecords }