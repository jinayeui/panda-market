import { ROUTES } from '../constants/routes';
import Button from '../components/Button';

export default function ComingSoonPage() {
  return (
    <section className='inner flex min-h-[calc(100vh-4.38rem)] flex-col items-center justify-center gap-4 px-4 py-20 text-center'>
      <h2 className='text-2xl-bold text-secondary-800 md:text-3xl-bold'>
        준비 중인 페이지예요
      </h2>
      <Button href={ROUTES.HOME} size='md' className='mt-4'>
        홈으로 가기
      </Button>
    </section>
  );
}
