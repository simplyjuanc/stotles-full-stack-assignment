import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';
import { ProcurementRecord } from '../lib/Api';
import ProcurementRecordPreviewModal from './ProcurementRecordPreview';

type Props = {
  records: ProcurementRecord[];
};

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: 'Published',
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: 'Title',
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href='#' onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: 'Buyer name',
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: 'Value',
        render: (record: ProcurementRecord) => {
          const [curr, val] = [record.currency, record.value];
          return curr && val
            ? `${val.toLocaleString()} ${curr}`
            : 'Not Available';
        },
      },
      {
        title: 'Stage',
        render: (record: ProcurementRecord) => {
          if (!record.closeDate) {
            return 'Not Available';
          }

          let res: string;
          if (record.stage === 'CONTRACT') {
            res = record.awardDate
              ? 'Awarded on ' + new Date(record.awardDate).toLocaleDateString()
              : 'Awarded';
          } else {
            const closeDate = new Date(record.closeDate);
            res =
              closeDate < new Date()
                ? 'Closed'
                : 'Open until ' + closeDate.toLocaleDateString();
          }

          return res;
        },
      },
    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
