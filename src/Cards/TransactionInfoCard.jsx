import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActions } from "@/hooks/use-actions";
import { formatCurrency } from "@/lib/financialUtils";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
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

const TransactionInfoCard = ({
  data,
  onEdit,
  showMethod = true,
  showDescription = true,
}) => {
  const { handleDelete } = useActions();
  if (!data) return null;

  const {
    icon,
    type,
    date,
    amount,
    source,
    category,
    description,
    paymentMethod,
  } = data;

  const isIncome = type === "income";
  const label = isIncome ? source : category;

  const AmountIcon = isIncome ? Plus : Minus;
  const TrendIcon = isIncome ? TrendingUp : TrendingDown;

  return (
    <Card className="group relative flex-row items-center gap-4 p-3 rounded-lg border-none shadow-none bg-muted/80 hover:bg-muted">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-muted-foreground/20 text-white text-lg rounded-full">
        {icon || <Utensils className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        {/* Info */}
        <div className="flex flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className={`text-sm opacity-80 font-medium ${
                    showDescription && description && "cursor-help"
                  }`}
                >
                  {label}
                </p>
              </TooltipTrigger>

              {/* Tooltip */}
              {showDescription && description && (
                <TooltipContent>
                  <p className="max-w-[200px] text-xs">{description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <p className="text-xs opacity-60 mt-1">{date}</p>

          {/* Payment Method */}
          {showMethod && paymentMethod && (
            <Badge
              variant="default"
              className="w-fit text-[10px] px-2 py-0.5 
                sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-52 sm:mt-0 mt-1"
            >
              {paymentMethod}
            </Badge>
          )}
        </div>

        {/* Amount + Menu */}
        <div className="flex items-center gap-2 justify-end w-auto">
          {/* Income/Expense Amlunt Badge */}
          <Badge
            variant={isIncome ? "income" : "expense"}
            className="px-3 py-1.5"
          >
            <AmountIcon size={15} />
            {`₹${formatCurrency(amount)}`}
            <TrendIcon size={18} />
          </Badge>

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
              <DropdownMenuItem onClick={onEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => handleDelete(data)}
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

export default memo(TransactionInfoCard);
