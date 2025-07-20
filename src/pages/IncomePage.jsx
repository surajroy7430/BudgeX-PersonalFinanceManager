import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIncome,
  downloadIncome,
  getIncome,
} from "../features/income/incomeSlice";
import IncomeList from "../components/income/IncomeList";
import IncomeOverviewChart from "../components/income/IncomeOverviewChart";

const IncomePage = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.items);
  const totalIncome = useSelector((state) => state.income.totalIncome);

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <IncomeOverviewChart />
      <IncomeList
        transactions={income}
        onDelete={(t) => dispatch(deleteIncome(t.id))}
        onDownload={() => dispatch(downloadIncome())}
      />
    </div>
  );
};

export default IncomePage;
