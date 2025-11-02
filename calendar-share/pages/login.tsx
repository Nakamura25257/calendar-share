import Link from 'next/link';
import styles from './styles/auth.module.css';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema, LoginShcemaType} from '@/types/resolver';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginShcemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginShcemaType) => {
    console.log(data);
  };

  return (
    <div className={styles.loginWrapper}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label>メールアドレス</label>
          <input
            type="text"
            placeholder="example@email.com"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}

        <div className={styles.inputWrapper}>
          <label>パスワード</label>
          <input
            type="password"
            placeholder="********"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}

        <button type="submit">ログイン</button>
      </form>

      <Link href="/register">
        <span>アカウントをお持ちでない方はこちら</span>
      </Link>
    </div>
  );
}
