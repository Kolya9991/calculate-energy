'use client'
import {useSearchParams} from "next/navigation";
import * as z from 'zod'
import CardWrapper from "@/components/auth/CardWrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/login";
import {useState, useTransition} from "react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import Link from "next/link";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? 'Email вже використовується іншим провайдером' : "";


  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          console.log(data)
          if (data?.error) {
            form.reset();
            setError(data.error)
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError('Сталась якась помикла'))
    })
  }

  return (
    <CardWrapper backButtonHref="/auth/register" backButtonLabel="Ще не маєте профілю?" headerLabel=""
                 showSocial>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className='space-y-4'>
            {!showTwoFactor ?
              <>
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
                <FormField
                  control={form.control}
                  name='password'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                          type='password'
                        />
                      </FormControl>
                      <Button size='sm' variant='link' asChild className='px-0 font-normal'>
                        <Link href='/auth/reset'>Забули пароль?</Link>
                      </Button>
                      <FormMessage/>
                    </FormItem>
                  )}/>
              </> :
              <FormField
                control={form.control}
                name='code'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>2FA код</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
            }
          </div>
          <FormError message={error || urlError}/>
          <FormSuccess message={success}/>
          <Button type="submit" className='w-full'>
            {showTwoFactor ? "Підтвердити" : "Увійти"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
