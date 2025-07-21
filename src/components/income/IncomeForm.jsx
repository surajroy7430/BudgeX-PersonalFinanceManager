import TransactionForm from "../transaction-form";
import { useDispatch } from "react-redux";
import { addIncome } from "../../features/income/incomeSlice";
import { SOURCE_OPTIONS } from "../../constants";

const IncomeForm = () => {
  const dispatch = useDispatch();

  return (
    <TransactionForm
      type="income"
      fieldLabel="Income Source"
      submitLabel="Add Income"
      options={SOURCE_OPTIONS}
      handleDispathSubmit={(data) => dispatch(addIncome(data))}
    />
  );
};

export default IncomeForm;
