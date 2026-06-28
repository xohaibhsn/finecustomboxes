import { useState, useEffect } from 'react';

interface Settings {
  logo_url: string;
  hero_image_url: string;
  about_image_url: string;
  favicon_url: string;
  hero_title: string;
  hero_subtitle: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
}

const defaultSettings: Settings = {
  logo_url: '',
  hero_image_url: '',
  about_image_url: '',
  favicon_url: '',
  hero_title: 'Custom Packaging Your Customers Will Love',
  hero_subtitle: 'High-quality custom boxes with free design, free shipping, and low minimums. Trusted by 5,000+ businesses across the United States.',
  phone: '+1 (555) 000-0000',
  email: 'info@finecustomboxes.com',
  whatsapp: '15550000000',
  address: 'United States',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { settings, loading };
}
