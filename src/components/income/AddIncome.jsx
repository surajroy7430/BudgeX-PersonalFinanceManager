import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, TrendingUp } from "lucide-react";
import IncomeForm from "./IncomeForm";

const AddIncome = () => {
  return (
    <Dialog>
      <DialogTrigger className="dialog-trigger hover:text-green-500">
        <Plus size={15} /> Add Income
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3 border-b flex gap-2">
            Add Income <TrendingUp className="text-green-600" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <IncomeForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddIncome;
