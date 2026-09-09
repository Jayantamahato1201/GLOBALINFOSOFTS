import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { localCmsStore } from '../admin/localCmsStore';
import {
  CmsPage,
  CmsSection,
  CmsBlog,
  CmsCareer,
  CmsService,
  CmsSolution,
  CmsProject,
  CmsTeamMember,
  CmsLocation,
  CmsTestimonial,
  CmsNavigationItem,
  CmsFooterSettings,
  CmsSiteSettings,
  CmsPaymentSettings
} from '../admin/cmsTypes';

interface PublicCmsData {
  pages: CmsPage[];
  sections: CmsSection[];
  blogs: CmsBlog[];
  careers: CmsCareer[];
  services: CmsService[];
  solutions: CmsSolution[];
  projects: CmsProject[];
  team: CmsTeamMember[];
  locations: CmsLocation[];
  testimonials: CmsTestimonial[];
  navigation: CmsNavigationItem[];
  footer: CmsFooterSettings;
  settings: CmsSiteSettings;
  payments?: CmsPaymentSettings;
  content: Record<string, any>;
}

interface CmsContextType {
  data: PublicCmsData | null;
  isLoading: boolean;
  error: string | null;
  refreshCmsData: () => Promise<void>;
  isMaintenanceMode: boolean;
  maintenanceMessage: string;
  isPageVisible: (routeOrId: string) => boolean;
  isSectionVisible: (sectionKeyOrId: string, pageRouteOrId?: string) => boolean;
  getSection: (sectionKeyOrId: string, pageRouteOrId?: string) => CmsSection | undefined;
  pages: CmsPage[];
  sections: CmsSection[];
  blogs: CmsBlog[];
  careers: CmsCareer[];
  services: CmsService[];
  solutions: CmsSolution[];
  projects: CmsProject[];
  team: CmsTeamMember[];
  locations: CmsLocation[];
  testimonials: CmsTestimonial[];
  navigation: CmsNavigationItem[];
  footer: CmsFooterSettings;
  settings: CmsSiteSettings;
  payments?: CmsPaymentSettings;
}

const defaultFooter: CmsFooterSettings = {
  companyDescription: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services in Jamshedpur.',
  copyrightText: `© ${new Date().getFullYear()} Global InfoSoft. All rights reserved.`,
  address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur, Jharkhand 831012',
  phone: '+91-9431515806',
  email: 'info@globalinfosoft.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/global-infosofts',
    twitter: 'https://twitter.com/globalinfosofts',
    facebook: 'https://facebook.com/globalinfosofts',
    github: 'https://github.com/globalinfosofts',
    youtube: 'https://youtube.com/@globalinfosofts'
  },
  enabledColumns: {
    brand: true,
    solutions: true,
    services: true,
    quickLinks: true,
    contact: true
  }
};

const defaultSettings: CmsSiteSettings = {
  companyName: 'Global InfoSoft',
  tagline: 'Transforming Ideas Into Intelligent Digital Realities',
  subTagline: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services in Jamshedpur.',
  logoUrl: '/logo.png',
  faviconUrl: '/logo.png',
  phone: '+91-9431515806',
  altPhone: '+91-7654730090',
  salesPhone: '+91-9431515806',
  contactEmail: 'info@globalinfosoft.com',
  supportEmail: 'info@globalinfosoft.com',
  officialEmail: 'info@globalinfosofts.com',
  headOfficeAddress: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012, Jharkhand, India',
  supportHours: 'Mon - Sat: 9:30 AM - 6:30 PM IST (Technical Support & Helpdesk)',
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back shortly.',
  allowPublicSignup: true,
  socialLinks: {
    linkedin: 'https://linkedin.com/company/global-infosofts',
    twitter: 'https://twitter.com/globalinfosofts',
    facebook: 'https://facebook.com/globalinfosofts',
    github: 'https://github.com/globalinfosofts',
    youtube: 'https://youtube.com/@globalinfosofts'
  }
};

const CmsContext = createContext<CmsContextType>({
  data: null,
  isLoading: true,
  error: null,
  refreshCmsData: async () => {},
  isMaintenanceMode: false,
  maintenanceMessage: '',
  isPageVisible: () => true,
  isSectionVisible: () => true,
  getSection: () => undefined,
  pages: [],
  sections: [],
  blogs: [],
  careers: [],
  services: [],
  solutions: [],
  projects: [],
  team: [],
  locations: [],
  testimonials: [],
  navigation: [],
  footer: defaultFooter,
  settings: defaultSettings,
  payments: undefined
});

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PublicCmsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCmsData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/cms-data');
      if (res.ok) {
        const text = await res.text();
        let json: PublicCmsData;
        try {
          json = JSON.parse(text);
          setData(json);
          setError(null);
          return;
        } catch {
          console.warn('[CmsContext] Non-JSON payload received from CMS endpoint, using local store.');
        }
      }

      // If server returns 404 (e.g. Vercel deployment), load from local store
      const localData = localCmsStore.handleRequest('/api/public/cms-data');
      if (localData) {
        setData(localData);
      }
      setError(null);
    } catch (err: any) {
      console.warn('[CmsContext] Network fetch failed, reading from local CMS store:', err);
      const localData = localCmsStore.handleRequest('/api/public/cms-data');
      if (localData) {
        setData(localData);
      }
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCmsData();

    // Listen for custom cms-updated events dispatched when the admin panel saves data
    const handleCmsUpdated = () => {
      fetchCmsData();
    };

    window.addEventListener('cms-data-updated', handleCmsUpdated);
    return () => window.removeEventListener('cms-data-updated', handleCmsUpdated);
  }, [fetchCmsData]);

  const isMaintenanceMode = !!data?.settings?.maintenanceMode;
  const maintenanceMessage = data?.settings?.maintenanceMessage || defaultSettings.maintenanceMessage;

  const isPageVisible = useCallback(
    (routeOrId: string): boolean => {
      if (!routeOrId) return true;
      const clean = routeOrId.replace(/^page-/, '').toLowerCase();
      const matched = (data?.pages || []).find(
        (p) =>
          p.route.toLowerCase() === clean ||
          p.id.toLowerCase() === `page-${clean}` ||
          p.id.toLowerCase() === clean
      );
      if (matched) {
        return matched.enabled !== false;
      }
      return true;
    },
    [data?.pages]
  );

  const normalizeKey = (key: string) => key.toLowerCase().replace(/[-_]/g, '');

  const isSectionVisible = useCallback(
    (sectionKeyOrId: string, pageRouteOrId?: string): boolean => {
      if (!sectionKeyOrId) return true;
      const cleanKey = normalizeKey(sectionKeyOrId);
      const cleanPage = pageRouteOrId ? pageRouteOrId.replace(/^page-/, '').toLowerCase() : undefined;

      const matched = (data?.sections || []).find((s) => {
        const sKey = normalizeKey(s.sectionKey);
        const sId = normalizeKey(s.id.replace(/^sec-/, ''));
        const keyMatch = 
          sKey === cleanKey || 
          sId === cleanKey || 
          (cleanKey === 'team' && sKey === 'experts') ||
          (cleanKey === 'experts' && sKey === 'team') ||
          (cleanKey === 'packagebuilder' && (sKey === 'buildpackage' || sKey === 'pricing')) ||
          (cleanKey === 'whyus' && (sKey === 'whydeploy' || sKey === 'trust'));
        if (!keyMatch) return false;
        if (cleanPage) {
          const sPage = s.pageId.replace(/^page-/, '').toLowerCase();
          return sPage === cleanPage;
        }
        return true;
      });

      if (matched) {
        return matched.enabled !== false;
      }
      return true;
    },
    [data?.sections]
  );

  const getSection = useCallback(
    (sectionKeyOrId: string, pageRouteOrId?: string): CmsSection | undefined => {
      if (!sectionKeyOrId) return undefined;
      const cleanKey = normalizeKey(sectionKeyOrId);
      const cleanPage = pageRouteOrId ? pageRouteOrId.replace(/^page-/, '').toLowerCase() : undefined;

      return (data?.sections || []).find((s) => {
        const sKey = normalizeKey(s.sectionKey);
        const sId = normalizeKey(s.id.replace(/^sec-/, ''));
        const keyMatch = 
          sKey === cleanKey || 
          sId === cleanKey || 
          (cleanKey === 'team' && sKey === 'experts') ||
          (cleanKey === 'experts' && sKey === 'team') ||
          (cleanKey === 'packagebuilder' && (sKey === 'buildpackage' || sKey === 'pricing')) ||
          (cleanKey === 'whyus' && (sKey === 'whydeploy' || sKey === 'trust'));
        if (!keyMatch) return false;
        if (cleanPage) {
          const sPage = s.pageId.replace(/^page-/, '').toLowerCase();
          return sPage === cleanPage;
        }
        return true;
      });
    },
    [data?.sections]
  );

  return (
    <CmsContext.Provider
      value={{
        data,
        isLoading,
        error,
        refreshCmsData: fetchCmsData,
        isMaintenanceMode,
        maintenanceMessage,
        isPageVisible,
        isSectionVisible,
        getSection,
        pages: data?.pages || [],
        sections: data?.sections || [],
        blogs: data?.blogs || [],
        careers: data?.careers || [],
        services: data?.services || [],
        solutions: data?.solutions || [],
        projects: data?.projects || [],
        team: data?.team || [],
        locations: data?.locations || [],
        testimonials: data?.testimonials || [],
        navigation: data?.navigation || [],
        footer: data?.footer || defaultFooter,
        settings: data?.settings || defaultSettings,
        payments: data?.payments
      }}
    >
      {/* Maintenance Mode Alert Banner if active on public site */}
      {isMaintenanceMode && (
        <div className="bg-amber-500/90 text-slate-950 font-medium px-4 py-2 text-center text-sm z-50 sticky top-0 backdrop-blur shadow-md flex items-center justify-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          <span><strong>Notice:</strong> {maintenanceMessage}</span>
        </div>
      )}
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => useContext(CmsContext);
