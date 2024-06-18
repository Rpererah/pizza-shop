import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
export default function SignIn() {
  const signInForm = z.object({
    email: z.string().email(),
  })

  type SignInForm = z.infer<typeof signInForm>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Enviamos um link de autenticacao para seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSignIn(data)
          },
        },
      })
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.error('Credenciais invalidas')
    }
  }
  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
        <Button
          variant={'secondary'}
          asChild
          className="absolute right-8 top-8"
        >
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Seu e-mail</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
