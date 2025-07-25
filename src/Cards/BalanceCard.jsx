import { memo } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatCurrencyTo2Dec } from "@/lib/financialUtils";

const BalanceCard = ({ icon: Icon, label, amount, color }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 self-start">
        <div
          className={`w-12 h-12 flex items-center p-0.5 justify-center text-white ${color} text-2xl rounded-full drop-shadow-xl`}
        >
          <Icon />
        </div>

        <div>
          <CardDescription className="text-muted-foreground mb-0.5">
            {label}
          </CardDescription>
          <CardTitle>₹{formatCurrencyTo2Dec(amount)}</CardTitle>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(BalanceCard);
