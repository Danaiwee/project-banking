import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

import CategoryBadges from "./CategoryBadges";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table className="rounded-xl">
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((transaction: Transaction) => {
          const { id, name, amount, type, date, category, paymentChannel } =
            transaction;

          const status = getTransactionStatus(date);
          const isDebit = type === "debit";
          const isCredit = type === "credit";
          const showAmount = formatAmount(amount);
          return (
            <TableRow
              key={id}
              className={`${isDebit ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"} h-20`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-[14px] truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`pl-1 pr-10 font-semibold ${isDebit ? "text-[#f04438]" : "text-[#039855]"}`}
              >
                {isCredit
                  ? `-${showAmount}`
                  : isCredit
                    ? showAmount
                    : showAmount}
              </TableCell>

              <TableCell className="pl-1 pr-10">
                <CategoryBadges category={status} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(date)).dateTime}
              </TableCell>

              <TableCell className="pl-2 pr-10 capitalize min-w-24 max-md:hidden">
                {paymentChannel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadges category={category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
