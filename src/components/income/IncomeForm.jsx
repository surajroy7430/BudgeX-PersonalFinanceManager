import TransactionForm from "../transaction-form";
import { useDispatch } from "react-redux";
import { addIncome } from "../../features/income/incomeSlice";

const IncomeForm = () => {
  const dispatch = useDispatch();

  return (
    <TransactionForm
      type="income"
      fieldLabel="Income Source"
      submitLabel="Add Income"
      handleDispathSubmit={(data) => dispatch(addIncome(data))}
    />
  );
};

export default IncomeForm;
