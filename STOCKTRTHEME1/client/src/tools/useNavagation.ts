import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();
  
  return {
    goIntro: () => router.push('/'),
    goToProfile: (id: string) => router.push(`/profile/${id}`),
    goToSignup: () => router.push('/signup'),
    goToApp: () => router.push('/app'),
    goToLogin: () => router.push('/login'),
    goToGitHub: () => window.open('https://github.com/AWERDdev/', '_blank'),
    goToMainApp: () => router.push('/MainApp')
    // more routes...
  };
};
