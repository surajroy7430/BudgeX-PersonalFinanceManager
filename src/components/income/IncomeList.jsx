import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import TransactionInfoCard from "../../Cards/dashboard/TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <CardDescription />
        {transactions?.length > 0 && (
          <CardAction>
            <Button variant="outline" onClick={onDownload}>
              <Download /> Download
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            icon={income.icon}
            label={income.source}
            amount={income.amount.toLocaleString("en-IN")}
            date={income.date}
            type={income.type}
            onDelete={() => onDelete(income)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default IncomeList;
