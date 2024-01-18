import React from 'react'
import CardWrapper from '@/components/auth/cardWrapper'

const LoginForm = () => {
  return (
    <CardWrapper
        headerLabel='Welcome Back'
        backButtonLabel="Don't have an Account"
        backButtonHref="/auth/register"
        showSocial
    > 
        LoginForm
    </CardWrapper>
  )
}

export default LoginForm