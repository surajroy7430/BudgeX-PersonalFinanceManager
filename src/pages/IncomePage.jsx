import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, Plus, TrendingUp } from "lucide-react";
import IncomeForm from "../components/income/IncomeForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { downloadIncome, getIncome } from "../features/income/incomeSlice";

const IncomePage = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const totalIncome = useSelector((state) => state.income.totalIncome);

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="dialog-trigger hover:text-green-500">
          <Plus size={15} /> Add Income
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-3 border-b flex gap-2">
              Add Income <TrendingUp className="text-green-600" />
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <IncomeForm />
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={() => dispatch(downloadIncome())}>
        <Download /> Download
      </Button>
    </div>
  );
};

export default IncomePage;
