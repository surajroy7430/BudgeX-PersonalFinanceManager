import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Minus,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Utensils,
} from "lucide-react";

const TransactionInfoCard = ({ icon, label, amount, date, type, onDelete }) => {
  return (
    <Card className="group relative flex-row items-center gap-4 p-3 rounded-lg border-none shadow-none bg-muted/80 hover:bg-muted">
      <div className="w-10 h-10 flex items-center justify-center bg-muted-foreground/20 text-white text-lg rounded-full">
        {icon ? icon : <Utensils className="w-6 h-6" />}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80 font-medium">{label}</p>
          <p className="text-xs opacity-60 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Delete button */}
          <button
            onClick={async () => {
              try {
                onDelete();
                toast.success("Transaction deleted!", { duration: 1200 });
              } catch (error) {
                toast.error("Failed to delete transaction");
              }
            }}
            className="hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Trash2 size={18} />
          </button>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
              type === "income"
                ? "bg-chart-2/10 text-chart-2"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            <h6 className="text-xs font-medium flex items-center gap-1">
              {type === "income" ? <Plus size={15} /> : <Minus size={15} />}{" "}
              {`₹${amount}`}
            </h6>
            {type === "income" ? (
              <TrendingUp size={20} />
            ) : (
              <TrendingDown size={20} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionInfoCard;
