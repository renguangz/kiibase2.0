import styled from 'styled-components';
import { TableDataContent } from '/src/utils/data/readme/tables';
import { Code, areCodeTextType } from '../Code';

const Table = styled.table`
  border: 1px solid #30363d;
  border-collapse: collapse;
  color: #e6edf3;
`;

const Thead = styled.thead`
  border-bottom: 1px solid #30363d;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #30363d;
`;

interface TableContent {
  $noRightBorder?: boolean;
}

const Th = styled.th<TableContent>`
  padding: 6px 13px;
  border-right: ${(props) => (props.$noRightBorder ? 0 : 1)}px solid #30363d;
`;

const Td = styled.td<TableContent>`
  padding: 6px 13px;
  border-right: ${(props) => (props.$noRightBorder ? 0 : 1)}px solid #30363d;
`;

type Column = {
  value: string;
  label: string;
};

interface MarkdownTableProps {
  columns: Column[];
  dataSource: Array<Record<string, any>>;
}

export function MarkdownTable({ columns, dataSource }: MarkdownTableProps) {
  return (
    <Table>
      <thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.value}>{column.label}</Th>
          ))}
        </Tr>
      </thead>
      <tbody>
        {dataSource.map((data, index) => (
          <Tr key={index}>
            {columns.map((column, idx) => {
              const value: TableDataContent = data[column.value];
              return (
                <Td key={`${column.value}-${index}-${idx}`}>
                  {areCodeTextType(value.content) ? (
                    <div style={{ paddingTop: 12 }}>
                      <Code contents={value.content} />
                    </div>
                  ) : (
                    value.content
                  )}
                </Td>
              );
            })}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
