"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ROUTES } from "@/constants/routes";
import { createTransfer } from "@/lib/actions/dwolla.action";
import { createTransaction } from "@/lib/actions/transaction.action";
import { getBank, getBankByAccountId } from "@/lib/actions/user.action";
import { decryptId } from "@/lib/utils";
import { paymentFormSchema } from "@/lib/validations";

import BankDropDown from "./BankDropDown";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface PaymentFormProps {
  accounts: Account[];
}

const PaymentForm = ({ accounts }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      shareableId: "",
    },
  });

  const handleSubmitForm = async (data: z.infer<typeof paymentFormSchema>) => {
    setIsLoading(true);
    try {
      const receiverAccountId = decryptId(data.shareableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });

      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };

      const transfer = await createTransfer(transferParams);

      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push(ROUTES.HOME);
        }
      }

      toast("Success", {
        description: "Your transaction successfully",
      });
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Failed to transfer the money",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className=" border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-[14px] font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-[12px] font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>

                <div className="w-full flex flex-col">
                  <FormControl>
                    <BankDropDown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className=" border-gray-100">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-[14px] font-medium text-gray-700">
                    Transfer Note (optional)
                  </FormLabel>
                  <FormDescription className="text-[12px] font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>

                <div className="flex flex-col w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-[18px] font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-[16px] font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t-2 border-gray-200">
              <div className="payment-transfer_form-item pb-5 pt-6">
                <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="w-full flex flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: johndoe@email.com"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shareableId"
          render={({ field }) => (
            <FormItem className="border-t-2 border-gray-200">
              <div className="payment-transfer_form-item pb-5 pt-6">
                <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700">
                  Receiver&apos;s Plaid shareableId
                </FormLabel>

                <div className="w-full flex flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item pb-5 pt-6">
                <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>

                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-500  " />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
