import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import FinancialAreaChart from "../../charts/FinancialAreaChart";

const FinancialOverview = ({ transactions }) => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="text-lg">Financial Overview</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <FinancialAreaChart data={transactions} />
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
