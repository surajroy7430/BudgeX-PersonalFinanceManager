import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const BalanceCard = ({ icon, label, amount, color }) => {
  return (
    <Card className="card">
      <CardContent className="flex items-center gap-4 self-start">
        <div
          className={`w-12 h-12 flex items-center p-0.5 justify-center text-white ${color} text-2xl rounded-full drop-shadow-xl`}
        >
          {icon}
        </div>

        <div>
          <CardDescription className="text-muted-foreground mb-0.5">
            {label}
          </CardDescription>
          <CardTitle className="text-lg">₹{amount}</CardTitle>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
