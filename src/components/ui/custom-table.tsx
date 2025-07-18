import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { cn } from '@/src/lib/utils';
import { TableValue } from '@sanity/table';

interface CustomTableProps {
  value: TableValue;
  className?: string;
}

export default function CustomTable({ value, className }: CustomTableProps) {
  if (!value || !value.rows || value.rows.length === 0) {
    return null;
  }

  const headerRow = value.rows[0];
  const bodyRows = value.rows.slice(1);

  const formatCellContent = (cellText: string | null | undefined): string => {
    if (!cellText) {
      return '';
    }

    const listMarkerRegex = /– |\s*\([a-z0-9]+\)/gi;

    const formattedText = cellText.replace(listMarkerRegex, (match) => {
      return `\n${match}`;
    });

    return formattedText.replace(/^\n/, '');
  };

  return (
    <div className={cn('my-6 md:my-8 overflow-x-auto', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {headerRow.cells.map((headerCell, index) => (
              <TableHead key={index}>{headerCell}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodyRows.map((row) => (
            <TableRow key={row._key}>
              {row.cells.map((cell, index) => (
                <TableCell
                  key={index}
                  className='whitespace-pre-line align-top text-grey-text'
                >
                  {formatCellContent(cell)
                    .split('\n')
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
