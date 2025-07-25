import { lazy, memo, Suspense, useCallback, useMemo, useState } from "react";
import { capitalize } from "@/lib/financialUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Image } from "lucide-react";
import { Spinner } from "@rsuite/icons";
import { format } from "date-fns";
import {
  SOURCE_OPTIONS,
  CATEGORIES_OPTIONS,
  PAYMENT_METHODS,
} from "@/constants";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

const schema = z.object({
  field: z.string().trim().min(1),
  amount: z.preprocess((val) => parseFloat(val), z.number().positive()),
  date: z.preprocess((val) => new Date(val), z.date()),
  icon: z.string().min(1),
  paymentMethod: z.string().min(1),
  description: z.string().optional(),
});

const TransactionForm = ({ type, handleDispathSubmit }) => {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);

  const isIncome = type === "income";
  const submitLabel = isIncome ? "Add Income" : "Add Expense";

  const fieldLabel = isIncome ? "Income Source" : "Category";
  const options = isIncome ? SOURCE_OPTIONS : CATEGORIES_OPTIONS;

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      field: "",
      amount: "",
      date: new Date(),
      icon: "",
      paymentMethod: "Other",
      description: "",
    },
  });

  const onSubmit = useCallback(
    (data) => {
      const { field, description, ...rest } = data;

      const payload = {
        ...rest,
        [isIncome ? "source" : "category"]: capitalize(field),
        description: capitalize(description),
        date: format(data.date, "dd MMM yyyy"),
        type,
      };

      try {
        handleDispathSubmit(payload);

        form.reset({
          field: "",
          amount: "",
          date: new Date(),
          icon: "",
          paymentMethod: "Other",
          description: "",
        });
        setSelectedIcon("");
      } catch (error) {
        console.error("submit failed", error.message);
      }
    },
    [capitalize, form, handleDispathSubmit, type]
  );

  const handleEmojiClick = useCallback(
    (emojiData) => {
      setSelectedIcon(emojiData.emoji);
      form.setValue("icon", emojiData.emoji);
      setShowPicker(false);
    },
    [form]
  );

  const dataListOptions = useMemo(
    () =>
      options.map((option) => (
        <option key={option.value} value={option.value} />
      )),
    [options]
  );

  const paymentMethodOptions = useMemo(
    () =>
      PAYMENT_METHODS.map((method) => (
        <SelectItem key={method.value} value={method.value}>
          {method.label}
        </SelectItem>
      )),
    [PAYMENT_METHODS]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Icon */}
        <FormField
          control={form.control}
          name="icon"
          render={() => (
            <FormItem className="flex gap-2">
              <FormControl>
                <Popover open={showPicker} onOpenChange={setShowPicker}>
                  <PopoverTrigger asChild>
                    <div className="flex gap-2 items-center w-fit">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-10 h-10 p-0"
                      >
                        {selectedIcon || <Image />}
                      </Button>
                      <FormLabel>
                        {selectedIcon ? "Change Icon" : "Pick Icon"}
                      </FormLabel>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-64">
                    <Suspense
                      fallback={
                        <div className="w-64 h-64 flex items-center justify-center">
                          <Spinner
                            pulse
                            className="text-3xl text-muted-foreground"
                          />
                        </div>
                      }
                    >
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        height={350}
                        className="max-w-xs w-full"
                      />
                    </Suspense>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Source / Category */}
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabel}</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      list="input-options"
                      placeholder={`e.g. ${
                        type === "income"
                          ? "salary, freelance"
                          : "groceries, rent"
                      }`}
                      autoComplete="off"
                      {...field}
                      className="capitalize placeholder:lowercase bg-transparent"
                    />
                    <datalist id="input-options">{dataListOptions}</datalist>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. 5000.00"
                    onChange={(e) => field.onChange(e.target.value)}
                    className="bg-transparent"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal rounded-md",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "dd/MMM/yyyy")
                          : "Select Date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-64">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                      }}
                      disabled={(date) => date > new Date()}
                      captionLayout="dropdown"
                      fromYear={2000}
                      toYear={new Date().getFullYear()}
                      initialFocus
                      className="max-w-xs w-full text-xs"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Method</FormLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{paymentMethodOptions}</SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Description (optional) */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add any notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" variant="default" className="w-full py-5 mt-3">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default memo(TransactionForm);
