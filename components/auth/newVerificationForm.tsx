"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners"
import CardWrapper from '@/components/auth/cardWrapper';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/newVerification';

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
      if (sucess || error) return;
      if (!token) {
        setError("Missing token");
        return;
      }

      newVerification(token)
        .then((data) => {
          setSucess(data.sucess);
          setError(data.error);
        })
        .catch((error) => {
          setError("Something went wrong")
          console.error(error);
        })

    }, [token, sucess, error]);


    useEffect(() => {
      onSubmit()
    }, [onSubmit])
  return (
    <CardWrapper
        headerLabel='Confirming your verification'
        backButtonLabel='Back to login'
        backButtonHref='/auth/login'

    >
        <div className='flex items-center w-full justify-center'>
            {!sucess && !error && (
              <BeatLoader/>
            )}
            <FormSucess message={sucess} />
            {!sucess && (
              <FormError message={error} />
            )}
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm