import { useEffect } from 'react';
import { useSystemStore } from './store/useSystemStore';
import { useThemeStore } from './store/useThemeStore';
import { BootScreen } from './components/system/BootScreen';
import { LoginScreen } from './components/system/LoginScreen';
import { Desktop } from './components/desktop/Desktop';

function App() {
  const { isBooting, isLoggedIn } = useSystemStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isBooting) {
    return <BootScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return <Desktop />;
}

export default App;
