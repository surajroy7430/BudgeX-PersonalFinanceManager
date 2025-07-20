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
});

const TransactionForm = ({
  type,
  fieldLabel,
  submitLabel,
  handleDispathSubmit,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      field: "",
      amount: "",
      date: new Date(),
      icon: "",
    },
  });

  const onSubmit = (data) => {
    const { field, ...rest } = data;
    const payload = {
      ...rest,
      [type === "income" ? "source" : "category"]: field,
      date: format(data.date, "dd MMM yyyy"),
      type,
    };
    handleDispathSubmit(payload);
    form.reset({
      field: "",
      amount: "",
      date: new Date(),
      icon: "",
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
              <div className="flex items-center gap-2">
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPicker((prev) => !prev)}
                    className="w-10 h-10 p-0"
                  >
                    {selectedIcon || <Image />}
                  </Button>
                </FormControl>
              </div>
              <FormLabel>
                {selectedIcon ? "Change Icon" : "Pick Icon"}
              </FormLabel>
              {showPicker && (
                <div className="z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} height={350} />
                </div>
              )}
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
