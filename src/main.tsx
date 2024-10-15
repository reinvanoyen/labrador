import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Theme} from "@radix-ui/themes";
import App from './components/App.tsx'
import "./css/index.css";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme radius="large" appearance="dark" accentColor="indigo">
          <App />
      </Theme>
  </StrictMode>,
)
