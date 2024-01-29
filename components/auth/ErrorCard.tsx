import React from 'react'
import CardWrapper from './cardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';


const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel='Oops Something went wront'
        backButtonHref='/auth/login'
        backButtonLabel='Back to login'
    >
        <div className='w-full flex justify-center items-center'>
            <ExclamationTriangleIcon className='text-destructive size-7'/>
        </div>
    </CardWrapper>
  )
}

export default ErrorCard