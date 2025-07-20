import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddExpense from "./AddExpense";

const ExpenseOverviewChart = () => {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle>Expense Sources</CardTitle>
        <CardDescription />
        <CardAction>
          <AddExpense />
        </CardAction>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  )
}

export default ExpenseOverviewChart
