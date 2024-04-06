import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Api from '../lib/Api'; // Adjust the import path based on your project structure
import RecordSearchPage from '../components/RecordSearchPage';
import { mockProcurementRecords, mockSearchRecordsResponse } from './mocks';
import '@testing-library/jest-dom';

jest.mock('../lib/Api'); // Mock the entire module
const PAGE_SIZE = 1;

describe('RecordSearchPage', () => {
  beforeEach(() => {
    // Mock the searchRecords method before each test
    Api.prototype.searchRecords = jest
      .fn()
      .mockResolvedValue(mockSearchRecordsResponse);
  });

  test('renders correctly and loads initial records', async () => {
    render(<RecordSearchPage />);

    // Check if the initial fetch call is made
    expect(Api.prototype.searchRecords).toHaveBeenCalledWith({
      textSearch: '',
      limit: PAGE_SIZE,
      offset: 0,
    });

    // Wait for records to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(mockProcurementRecords[0].title)
      ).toBeInTheDocument();
    });
  });

  test('loads more records on "Load more" button click', async () => {
    const moreRecordsMock = {
      ...mockSearchRecordsResponse,
      records: [
        mockProcurementRecords[0],
        { ...mockProcurementRecords, id: 'rec-124' },
      ],
    };

    // NEXT finish this test
    Api.prototype.searchRecords
      .mockResolvedValueOnce(mockSearchRecordsResponse)
      .mockResolvedValueOnce(moreRecordsMock);

    render(<RecordSearchPage />);

    // Click "Load more"
    await waitFor(() => userEvent.click(screen.getByText('Load more')));

    // Expect the API to be called again with updated offset
    expect(Api.prototype.searchRecords).toHaveBeenCalledWith({
      textSearch: '',
      limit: PAGE_SIZE,
      offset: PAGE_SIZE, // Because it's the second page
    });

    // Verify that more records are displayed
    await waitFor(() => {
      expect(
        screen.getByText(mockProcurementRecords[1].title)
      ).toBeInTheDocument();
      expect(screen.getAllByText(mockProcurementRecords[1].title)).toBe(
        'Test Record 2'
      );
    });
  });

  test('resets records and pagination on filter change', async () => {
    render(<RecordSearchPage />);

    // Simulate changing filters
    // This assumes you have an input for search queries as part of your RecordSearchFilters component
    await waitFor(() =>
      userEvent.type(screen.getByRole('textbox'), 'New search query')
    );

    // Check if the component resets pagination and records
    expect(Api.prototype.searchRecords).toHaveBeenCalledWith({
      textSearch: 'New search query',
      limit: PAGE_SIZE,
      offset: 0, // Resets to the first page
    });
  });
});

/* 
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RecordsTable from '../components/RecordsTable';
import { mockProcurementRecords } from './mocks';
import '@testing-library/jest-dom';

describe('RecordsTable', () => {
  it('renders without crashing', () => {
    render(<RecordsTable records={mockProcurementRecords} />);
  });

  it('displays the correct number of records', () => {
    render(<RecordsTable records={mockProcurementRecords} />);
    const rows = screen.getAllByRole('row');
    // Expect header row + records length
    expect(rows).toHaveLength(mockProcurementRecords.length + 1);
  });

  it('opens a modal when a record title is clicked', async () => {
    render(<RecordsTable records={mockProcurementRecords} />);
    fireEvent.click(screen.getByText('Test Title 1'));
    expect(await screen.findByRole('dialog')).toBeTruthy();
  });

  it('displays the correct content for each cell', () => {
    render(<RecordsTable records={mockProcurementRecords} />);

    expect(screen.getByText('Test Buyer 1')).toBeTruthy();
    expect(screen.getByText('1,000 USD')).toBeTruthy();
    expect(screen.getByText('Open until 2/1/2021')).toBeTruthy();
    // Check other cells similarly
  });

  // Add more tests as needed for interaction, data display, and edge cases
});
 */
