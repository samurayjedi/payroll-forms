import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import i18nTranslator from 'i18next';
import { initReactI18next } from 'react-i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import LocalesResourcesBackend from 'i18next-http-backend';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// fonts required by mui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// continue with internal dependencies....
import { usePiwiTheme } from './hooks';
import '../css/app.css';

i18nTranslator
  .use(initReactI18next)
  .use(BrowserLanguageDetector)
  .use(LocalesResourcesBackend)
  .init({
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

createInertiaApp({
  title: (title) => `${title} - `,
  resolve: async (name) => {
    const Page = (await import(`./Pages/${name}`)).default;

    if (!Page) {
      throw new Error(`${name} not exists!!!`);
    }

    return Page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <Piwi>
        <App {...props} />
      </Piwi>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});

function Piwi({ children }: { children: React.ReactNode }) {
  const theme = usePiwiTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
