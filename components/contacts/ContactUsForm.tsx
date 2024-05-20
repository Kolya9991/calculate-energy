'use client';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createContactUs } from "@/actions/createContactUs";
import { toast } from 'sonner';
import * as z from "zod";
import { ContactUsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

interface ContactFormInputs {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

const ContactUsForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      comment: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        const data = await createContactUs(values);

        console.log("Response data:", data);
        setError(data?.error);
        setSuccess(data?.success);

        if (data?.success) {
          toast.success('Ваше повідомлення було відправлено!');
          form.reset();
        }
      } catch (err) {
        console.error('Error during submission:', err); // Log errors
        setError('Виникла помилка під час відправлення повідомлення.');
      }
    });
  };

  return (
    <div className="w-full bg-white p-2 md:max-w-[49%] rounded shadow-md">
      <h2 className="text-center text-2xl mb-4">Є питання або пропозиція?</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім'я</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='phone'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='comment'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Коментар</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            Відправити
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactUsForm;
