import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIncome,
  downloadIncome,
  getIncome,
} from "../features/income/incomeSlice";
import IncomeList from "../components/income/IncomeList";
import FinancialTypeOverviewChart from "../charts/FinancialTypeOverviewChart";

const IncomePage = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialTypeOverviewChart transactions={income} type='income' />
      
      <IncomeList
        transactions={income}
        onDelete={(t) => dispatch(deleteIncome(t.id))}
        onDownload={() => dispatch(downloadIncome())}
      />
    </div>
  );
};

export default IncomePage;
