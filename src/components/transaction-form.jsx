import { cn } from "@/lib/utils";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
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
import { format } from "date-fns";

const schema = z.object({
  field: z.string().trim().min(1),
  amount: z.preprocess((val) => parseFloat(val), z.number().positive()),
  date: z.preprocess((val) => new Date(val), z.date()),
  icon: z.string().min(1),
  paymentMethod: z.string().min(1),
  description: z.string().optional(),
});

const TransactionForm = ({
  type,
  fieldLabel,
  submitLabel,
  handleDispathSubmit,
}) => {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);

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

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const onSubmit = (data) => {
    const { field, ...rest } = data;
    const payload = {
      ...rest,
      [type === "income" ? "source" : "category"]: capitalize(field),
      date: format(data.date, "dd MMM yyyy"),
      type,
    };
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
  };

  const handleEmojiClick = (emojiData) => {
    setSelectedIcon(emojiData.emoji);
    form.setValue("icon", emojiData.emoji);
    setShowPicker(false);
  };

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
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      height={350}
                      className="max-w-xs w-full"
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Source / Category */}
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={`e.g. ${
                    type === "income" ? "salary, freelance" : "groceries, rent"
                  }`}
                  {...field}
                  className="capitalize placeholder:lowercase"
                />
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
                  placeholder="e.g. 5000"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Card">Credit/Debit Card</SelectItem>
                  <SelectItem value="Auto Debit">Auto Debit</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Description (optional) */}
        {type === "expenses" && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='add any notes'
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white mt-3 hover:bg-indigo-700"
        >
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
