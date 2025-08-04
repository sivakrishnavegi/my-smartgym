import LoginPageContainer from '@/core/containers/Auth/Login'
import AuthPageLayout from '@/core/layouts/Auth'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <AuthPageLayout>
            <LoginPageContainer />
        </AuthPageLayout>
    </div>
  )
}

export default LoginPage