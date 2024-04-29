'use client';
import CardWrapper from "@/components/auth/CardWrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verification";
import FormSuccess from "@/components/FormSuccess";
import FormError from "@/components/FormError";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if(success || error) return;

    if (!token) {
      setError('Відсутній token!')
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      }).catch(() => {
      setError('Щось пішло не так!')
    })
  }, [error, success, token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Підтвердіть свою верифікацію" backButtonLabel="Повернутися до входу"
                 backButtonHref='/auth/login'>
      <div className='flex items-center justify-center w-full flex-col gap-4'>
        {!success && !error ? <BeatLoader/> : null}
        <FormSuccess message={success}/>
        {!success ? <FormError message={error}/> : null}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;