import { Result } from "@/app/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const TableView = ({
  results,
  displayColumns,
}: {
  results: Result[];
  displayColumns?: string[];
}) => {
  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  const formatTitle = (title: string) => {
    return title.split("_").join(" ");
  };

  return (
    <Table className="min-w-full divide-y divide-border">
      <TableHeader className="bg-secondary sticky top-0 shadow-sm">
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              {displayColumns ? displayColumns[index] : formatTitle(column)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="bg-card divide-y divide-border">
        {results.map((row, index) => (
          <TableRow key={index} className="hover:bg-muted">
            {columns.map((column, cellIndex) => (
              <TableCell
                key={cellIndex}
                className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
              >
                {row[column]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
