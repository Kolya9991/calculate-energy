'use client'
import * as z from 'zod'
import CardWrapper from "@/components/auth/CardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ResetSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import {reset} from "@/actions/reset";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper backButtonHref="/auth/login" backButtonLabel="Повернутись на сторінку авторизації"
                 headerLabel="Забули пароль?">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email@gmail.com"
                      type='email'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type="submit" className='w-full'>
            Скинути пароль
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;