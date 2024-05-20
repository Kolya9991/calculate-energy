import { Resend } from "resend";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
  await resend.emails.send({
    from: 'mail@resend-testing.site',
    to: email,
    subject: 'Підтвердження вашої електронної пошти',
    html: `<p>Натисніть <a href="${confirmLink}">тут</a>, щоб підтвердити електронну пошту.</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`
  await resend.emails.send({
    from: 'mail@resend-testing.site',
    to: email,
    subject: 'Скидання паролю',
    html: `<p>Натисніть <a href="${resetLink}">тут</a>, щоб скинути пароль.</p>`,
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'mail@resend-testing.site',
    to: email,
    subject: 'Код двофакторної аутентифікації',
    html: `<p>Ваш код для двофакторної аутентифікації: ${token}</p>`,
  })
}
