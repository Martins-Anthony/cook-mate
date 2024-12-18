'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
} from '../../lib/auth'
import GoogleLoginButton from '../../components/authentication/GoogleLoginButton'
import EmailPasswordForm from '../../components/authentication/EmailPasswordForm'
import ResetPasswordForm from '../../components/authentication/ResetPasswordForm'
import { Section } from '@/components/layout/Section'
import { useAuth } from '@/lib/useAuth'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirige si l'utilisateur est connecté
  if (isAuthenticated) {
    router.push('/dashboard')
  }

  const handleLogin = async (loginMethod: () => Promise<any>) => {
    try {
      await loginMethod()
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      alert(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      )
    }
  }

  const handleGoogleLogin = () => handleLogin(signInWithGoogle)

  const handleEmailLogin = () => {
    if (isNewUser) {
      return handleLogin(() => signUpWithEmail(email, password))
    }
    return handleLogin(() => signInWithEmail(email, password))
  }

  const handlePasswordReset = async () => {
    await resetPassword(email)
    alert('Un email pour réinitialiser votre mot de passe a été envoyé.')
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
      <Section className='max-w-96 w-full'>
        {showResetPassword ? (
          <ResetPasswordForm
            email={email}
            setEmail={setEmail}
            onSubmit={handlePasswordReset}
            onCancel={() => setShowResetPassword(false)}
          />
        ) : (
          <>
            <div className='flex justify-center'>
              <GoogleLoginButton onClick={handleGoogleLogin} />
            </div>
            <div className='flex flex-row flex-nowrap items-center'>
              <div className='h-0.5 bg-secondary w-full'></div>
              <div className='w-full text-nowrap p-4'>
                Ou {isNewUser ? "s'inscrire" : 'se connecter'} avec
              </div>
              <div className='h-0.5 bg-secondary w-full'></div>
            </div>
            <EmailPasswordForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              isNewUser={isNewUser}
              onSubmit={handleEmailLogin}
              toggleNewUser={() => setIsNewUser(!isNewUser)}
              onResetPassword={() => setShowResetPassword(true)}
            />
          </>
        )}
      </Section>
    </main>
  )
}

export default LoginPage
