import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Minus,
  Plus,
  EllipsisVertical,
  TrendingDown,
  TrendingUp,
  Utensils,
} from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const AllTransactionsCard = ({
  icon,
  label,
  amount,
  date,
  type,
  paymentMethod,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="group relative flex-row items-center gap-4 p-3 cursor-default rounded-lg border-none shadow-none bg-muted/80 hover:bg-muted">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-muted-foreground/20 text-white text-lg rounded-full">
        {icon || <Utensils className="w-6 h-6" />}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        {/* Info + Tooltip */}
        <div className="flex flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className={`text-sm opacity-80 font-medium ${
                    description && "cursor-help"
                  }`}
                >
                  {label}
                </p>
              </TooltipTrigger>
              {description && (
                <TooltipContent>
                  <p className="max-w-[200px] text-xs">{description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <p className="text-xs opacity-60 mt-1">{date}</p>
          <Badge
            variant="default"
            className="w-fit text-[10px] px-2 py-0.5 
                sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-52 sm:mt-0 mt-1"
          >
            {paymentMethod}
          </Badge>
        </div>

        {/* Amount + Menu */}
        <div className="flex items-center gap-2 justify-end w-auto">
          {/* Income/Expense badge */}
          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium ${
              type === "income"
                ? "bg-chart-2/10 text-chart-2"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {/* <h6 className="text-xs font-medium flex items-center gap-1"> */}
            {type === "income" ? <Plus size={15} /> : <Minus size={15} />}{" "}
            {`₹${amount}`}
            {/* </h6> */}
            {type === "income" ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}
          </div>

          {/* Edit/Delete Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              >
                <EllipsisVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  try {
                    onDelete();
                    toast.success("Transaction deleted!", { duration: 1200 });
                  } catch (error) {
                    toast.error("Failed to delete transaction");
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default AllTransactionsCard;
