import { createContext, useContext } from 'react';

export interface CrmPortalContextType {
  onBackToWebsite: () => void;
  onOpenAdminCms: () => void;
}

const defaultContext: CrmPortalContextType = {
  onBackToWebsite: () => {
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new Event('hashchange'));
  },
  onOpenAdminCms: () => {
    window.location.hash = 'admin';
    window.dispatchEvent(new Event('hashchange'));
  },
};

const CrmPortalContext = createContext<CrmPortalContextType>(defaultContext);

export const CrmPortalProvider = CrmPortalContext.Provider;

export function useCrmPortalNav() {
  return useContext(CrmPortalContext);
}
