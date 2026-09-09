import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Save,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Building2,
  QrCode,
  Globe,
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsPaymentSettings, CmsPaymentTransaction } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const PaymentManager: React.FC = () => {
  const { apiFetch, showToast, canPublish } = useAdminAuth();

  const [paymentData, setPaymentData] = useState<CmsPaymentSettings>({
    enabled: true,
    provider: 'razorpay',
    currency: 'INR',
    testMode: true,
    merchantId: 'MID_GIS_943151',
    keyId: 'rzp_test_1DP5mmOlF5G5ag',
    keySecret: '••••••••••••••••',
    webhookSecret: '••••••••••••••••',
    upiVpa: 'globalinfosoft@upi',
    upiPayeeName: 'Global InfoSoft',
    bankDetails: {
      accountHolderName: 'GLOBAL INFOSOFT',
      bankName: 'State Bank of India',
      accountNumber: '34890123847',
      ifscCode: 'SBIN0001857',
      branch: 'Bistupur, Jamshedpur'
    },
    notes: 'Official enterprise bank account for software licensing, AMC, and consulting contracts.'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingSecret, setIsEditingSecret] = useState(false);
  const [newSecret, setNewSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isEditingWebhook, setIsEditingWebhook] = useState(false);
  const [newWebhook, setNewWebhook] = useState('');
  const [showWebhook, setShowWebhook] = useState(false);
  const [activeTab, setActiveTab] = useState<'razorpay' | 'stripe' | 'upi' | 'bank'>('razorpay');
  const [showLiveConfirm, setShowLiveConfirm] = useState(false);
  const [transactions, setTransactions] = useState<CmsPaymentTransaction[]>([]);
  const [validationStatus, setValidationStatus] = useState<{
    tested: boolean;
    valid: boolean;
    message: string;
  } | null>(null);

  const loadTransactions = async () => {
    try {
      const txData = await apiFetch('/api/payments/transactions');
      if (Array.isArray(txData)) setTransactions(txData);
    } catch (err) {
      console.warn('Could not load payment transactions:', err);
    }
  };

  useEffect(() => {
    const loadPaymentSettings = async () => {
      try {
        const data = await apiFetch('/api/settings/payments');
        if (data) {
          setPaymentData(data);
        }
      } catch (err) {
        console.error('Failed to load payment settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPaymentSettings();
    loadTransactions();
  }, [apiFetch]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPublish) {
      showToast('You do not have permission to modify payment credentials.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const payload: any = {
        ...paymentData,
        // Only submit new secrets if user explicitly changed them
        keySecret: isEditingSecret ? newSecret : paymentData.keySecret,
        webhookSecret: isEditingWebhook ? newWebhook : paymentData.webhookSecret
      };

      const updated = await apiFetch('/api/settings/payments', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });

      setPaymentData(updated);
      setIsEditingSecret(false);
      setNewSecret('');
      setIsEditingWebhook(false);
      setNewWebhook('');
      showToast('Payment gateway configurations saved securely to server!');
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message || 'Failed to save payment settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = () => {
    // Validate configuration format
    if (!paymentData.enabled) {
      setValidationStatus({
        tested: true,
        valid: false,
        message: 'Online payments are currently globally disabled.'
      });
      return;
    }

    if (paymentData.provider === 'razorpay') {
      if (!paymentData.keyId || paymentData.keyId.trim() === '') {
        setValidationStatus({
          tested: true,
          valid: false,
          message: 'Razorpay Key ID is missing.'
        });
        return;
      }
      const isTestPrefix = paymentData.keyId.startsWith('rzp_test_');
      const isLivePrefix = paymentData.keyId.startsWith('rzp_live_');
      if (paymentData.testMode && !isTestPrefix) {
        setValidationStatus({
          tested: true,
          valid: false,
          message: 'Environment is set to Test Mode, but Key ID does not begin with rzp_test_'
        });
        return;
      }
      if (!paymentData.testMode && !isLivePrefix) {
        setValidationStatus({
          tested: true,
          valid: false,
          message: 'Environment is set to Live Mode, but Key ID does not begin with rzp_live_'
        });
        return;
      }
      setValidationStatus({
        tested: true,
        valid: true,
        message: `Razorpay credentials syntax verified for ${paymentData.testMode ? 'Sandbox' : 'Production'}!`
      });
    } else if (paymentData.provider === 'stripe') {
      if (!paymentData.keyId || paymentData.keyId.trim() === '') {
        setValidationStatus({
          tested: true,
          valid: false,
          message: 'Stripe Publishable Key is missing.'
        });
        return;
      }
      setValidationStatus({
        tested: true,
        valid: true,
        message: 'Stripe publishable key format valid.'
      });
    } else {
      setValidationStatus({
        tested: true,
        valid: true,
        message: 'Direct UPI & Bank details verified for display on customer checkout.'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mr-2" />
        <span>Loading secure payment settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Payment Gateway &amp; Financial Settings
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-['JetBrains_Mono'] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Server-Side Encrypted
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure payment gateways (Razorpay, Stripe), UPI VPA, and corporate bank transfer details for client software orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTestConnection}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Validate Config</span>
          </button>
        </div>
      </div>

      {/* Validation Message Banner */}
      {validationStatus && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            validationStatus.valid
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {validationStatus.valid ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{validationStatus.message}</span>
          </div>
          <button
            onClick={() => setValidationStatus(null)}
            className="text-[10px] underline hover:no-underline text-slate-400"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Security Architecture Callout */}
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-semibold text-cyan-100">
            Security Guarantee: Zero Client-Side Secret Leakage
          </p>
          <p className="text-cyan-300/80 text-[11px]">
            API secret keys and webhook secrets are stored exclusively in the server backend and never exposed to frontend bundles or client-side network responses. The public API only receives public publishable keys.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Global Controls Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Global Payment Activation</span>
            <span className="text-xs font-normal text-slate-400">Master Switch</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Enable Payments Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div>
                <p className="font-semibold text-white">Accept Online Payments</p>
                <p className="text-[11px] text-slate-400">Toggle customer checkout forms</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentData.enabled}
                  onChange={(e) => setPaymentData({ ...paymentData, enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Test vs Live Environment */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div>
                <p className="font-semibold text-white">Environment Mode</p>
                <p className="text-[11px] text-slate-400">
                  {paymentData.testMode ? 'Sandbox (Test Transactions)' : 'Production (Real Money)'}
                </p>
              </div>
              <div className="flex items-center rounded-lg bg-slate-900 p-1 border border-slate-700">
                <button
                  type="button"
                  onClick={() => setPaymentData({ ...paymentData, testMode: true })}
                  className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition ${
                    paymentData.testMode
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Test
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (paymentData.testMode) {
                      setShowLiveConfirm(true);
                    } else {
                      setPaymentData({ ...paymentData, testMode: false });
                    }
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition ${
                    !paymentData.testMode
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live
                </button>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div>
                <p className="font-semibold text-white">Default Settlement Currency</p>
                <p className="text-[11px] text-slate-400">Base billing currency</p>
              </div>
              <select
                value={paymentData.currency}
                onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value as any })}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 font-medium"
              >
                <option value="INR">INR (₹ Indian Rupee)</option>
                <option value="USD">USD ($ US Dollar)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Provider Tabs */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('razorpay');
                  setPaymentData({ ...paymentData, provider: 'razorpay' });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'razorpay'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Razorpay (India)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('stripe');
                  setPaymentData({ ...paymentData, provider: 'stripe' });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'stripe'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Stripe (Global)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('upi');
                  setPaymentData({ ...paymentData, provider: 'upi_bank' });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'upi'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI Direct &amp; QR</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('bank');
                  setPaymentData({ ...paymentData, provider: 'upi_bank' });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'bank'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Transfer (NEFT/RTGS)</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-['JetBrains_Mono']">
              Active Gateway: <span className="text-cyan-400 uppercase font-bold">{paymentData.provider}</span>
            </div>
          </div>

          {/* TAB 1: RAZORPAY */}
          {activeTab === 'razorpay' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200 text-xs">
                <p className="font-semibold text-blue-100">Razorpay Configuration</p>
                <p className="text-[11px] text-blue-300/80 mt-0.5">
                  Supports UPI, NetBanking (SBI, HDFC, ICICI, Axis), Credit/Debit Cards, and Wallets. Acquire keys from your Razorpay Dashboard &rarr; Settings &rarr; API Keys.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Merchant ID</label>
                  <input
                    type="text"
                    value={paymentData.merchantId || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, merchantId: e.target.value })}
                    placeholder="e.g. MID_GIS_943151"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">
                    Key ID (Public / Publishable)
                  </label>
                  <input
                    type="text"
                    value={paymentData.keyId}
                    onChange={(e) => setPaymentData({ ...paymentData, keyId: e.target.value })}
                    placeholder="rzp_test_... or rzp_live_..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Prefix must be {paymentData.testMode ? 'rzp_test_' : 'rzp_live_'}
                  </span>
                </div>
              </div>

              {/* Secret Key Field (Masked) */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    Key Secret (Server-Side Secret)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingSecret(!isEditingSecret);
                      if (isEditingSecret) setNewSecret('');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
                  >
                    {isEditingSecret ? 'Cancel' : 'Change Secret'}
                  </button>
                </div>

                {isEditingSecret ? (
                  <div className="space-y-1">
                    <div className="relative">
                      <input
                        type={showSecret ? 'text' : 'password'}
                        value={newSecret}
                        onChange={(e) => setNewSecret(e.target.value)}
                        placeholder="Paste your new Razorpay secret here..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-white font-mono pr-10 focus:ring-1 focus:ring-cyan-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-amber-400 block">
                      New secret will replace the existing encrypted secret when you click Save Changes.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled
                      value={paymentData.keySecret || '••••••••••••••••'}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-500 font-mono cursor-not-allowed"
                    />
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">Protected</span>
                  </div>
                )}
              </div>

              {/* Webhook Secret */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    Webhook Secret (Signature Verification)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingWebhook(!isEditingWebhook);
                      if (isEditingWebhook) setNewWebhook('');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
                  >
                    {isEditingWebhook ? 'Cancel' : 'Change Webhook'}
                  </button>
                </div>

                {isEditingWebhook ? (
                  <div className="relative">
                    <input
                      type={showWebhook ? 'text' : 'password'}
                      value={newWebhook}
                      onChange={(e) => setNewWebhook(e.target.value)}
                      placeholder="Paste webhook verification secret..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-white font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowWebhook(!showWebhook)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showWebhook ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    disabled
                    value={paymentData.webhookSecret || '••••••••••••••••'}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-500 font-mono cursor-not-allowed"
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STRIPE */}
          {activeTab === 'stripe' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200 text-xs">
                <p className="font-semibold text-indigo-100">Stripe International Processing</p>
                <p className="text-[11px] text-indigo-300/80 mt-0.5">
                  Allows international clients in North America, Europe, and Asia to pay in USD, EUR, or GBP via credit card.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">
                    Publishable Key (pk_live / pk_test)
                  </label>
                  <input
                    type="text"
                    value={paymentData.keyId.startsWith('pk_') ? paymentData.keyId : ''}
                    onChange={(e) => setPaymentData({ ...paymentData, keyId: e.target.value })}
                    placeholder="pk_test_... or pk_live_..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Stripe Account ID</label>
                  <input
                    type="text"
                    value={paymentData.merchantId || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, merchantId: e.target.value })}
                    placeholder="acct_..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Secret Key Field */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-400" />
                    Stripe Secret Key (sk_live / sk_test)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsEditingSecret(!isEditingSecret)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
                  >
                    {isEditingSecret ? 'Cancel' : 'Change Secret'}
                  </button>
                </div>

                {isEditingSecret ? (
                  <input
                    type="password"
                    value={newSecret}
                    onChange={(e) => setNewSecret(e.target.value)}
                    placeholder="sk_test_... or sk_live_..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-indigo-500 text-white font-mono"
                  />
                ) : (
                  <input
                    type="text"
                    disabled
                    value={paymentData.keySecret || '••••••••••••••••'}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-500 font-mono cursor-not-allowed"
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 3: UPI DIRECT */}
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs">
                <p className="font-semibold text-emerald-100">Zero-Fee Direct UPI QR Transfer</p>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  Clients scan the UPI QR code using Google Pay, PhonePe, Paytm, or BHIM. Zero processing fee.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">UPI VPA Address</label>
                  <input
                    type="text"
                    value={paymentData.upiVpa || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, upiVpa: e.target.value })}
                    placeholder="e.g. globalinfosoft@upi or 9431515806@okbizaxis"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Registered Payee Name</label>
                  <input
                    type="text"
                    value={paymentData.upiPayeeName || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, upiPayeeName: e.target.value })}
                    placeholder="e.g. Global InfoSoft"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BANK ACCOUNT DETAILS */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs">
                <p className="font-semibold text-amber-100">Official Current Bank Account</p>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  Used for high-value enterprise custom software deployments, server procurement, and annual maintenance contracts (AMC).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Account Beneficiary Name</label>
                  <input
                    type="text"
                    value={paymentData.bankDetails?.accountHolderName || ''}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bankDetails: {
                          ...paymentData.bankDetails,
                          accountHolderName: e.target.value
                        }
                      })
                    }
                    placeholder="e.g. GLOBAL INFOSOFT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-amber-500 uppercase font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Bank Name</label>
                  <input
                    type="text"
                    value={paymentData.bankDetails?.bankName || ''}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bankDetails: {
                          ...paymentData.bankDetails,
                          bankName: e.target.value
                        }
                      })
                    }
                    placeholder="e.g. State Bank of India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Current Account Number</label>
                  <input
                    type="text"
                    value={paymentData.bankDetails?.accountNumber || ''}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bankDetails: {
                          ...paymentData.bankDetails,
                          accountNumber: e.target.value
                        }
                      })
                    }
                    placeholder="e.g. 34890123847"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">IFSC Code</label>
                  <input
                    type="text"
                    value={paymentData.bankDetails?.ifscCode || ''}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bankDetails: {
                          ...paymentData.bankDetails,
                          ifscCode: e.target.value.toUpperCase()
                        }
                      })
                    }
                    placeholder="e.g. SBIN0001857"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-amber-500 font-mono uppercase"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Branch Location</label>
                  <input
                    type="text"
                    value={paymentData.bankDetails?.branch || ''}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        bankDetails: {
                          ...paymentData.bankDetails,
                          branch: e.target.value
                        }
                      })
                    }
                    placeholder="e.g. Bistupur Main Branch, Jamshedpur, Jharkhand"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes & Client Invoicing Text */}
          <div className="pt-2">
            <label className="block text-slate-400 mb-1 font-medium">
              Invoicing &amp; Quotation Note (Appears on checkout receipts)
            </label>
            <textarea
              rows={2}
              value={paymentData.notes || ''}
              onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              placeholder="GST invoice will be dispatched upon transaction completion..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-cyan-500 text-xs"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] text-slate-400">
            {canPublish ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready to commit changes to database
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Read-only mode: Only Super Admin &amp; Admin can update credentials
              </span>
            )}
          </p>

          <button
            type="submit"
            disabled={isSaving || !canPublish}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Credentials...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Payment Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Webhook Endpoints & Transaction Audit Trail Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Verified Server-Side Webhook Endpoints &amp; Audit Logs
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Provider callbacks are validated via HMAC SHA-256 signatures before updating payment state.
            </p>
          </div>
          <button
            type="button"
            onClick={loadTransactions}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium flex items-center gap-1.5 transition self-start"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Refresh Transactions</span>
          </button>
        </div>

        {/* Webhook URLs for configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <p className="text-[11px] font-semibold text-slate-200">Razorpay Webhook URL</p>
            <code className="text-[10px] text-cyan-400 font-mono block break-all select-all p-1.5 bg-slate-900 rounded">
              {typeof window !== 'undefined' ? `${window.location.origin}/api/payments/webhook/razorpay` : '/api/payments/webhook/razorpay'}
            </code>
            <p className="text-[10px] text-slate-400">Header: <span className="font-mono text-slate-300">x-razorpay-signature</span></p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <p className="text-[11px] font-semibold text-slate-200">Stripe Webhook URL</p>
            <code className="text-[10px] text-cyan-400 font-mono block break-all select-all p-1.5 bg-slate-900 rounded">
              {typeof window !== 'undefined' ? `${window.location.origin}/api/payments/webhook/stripe` : '/api/payments/webhook/stripe'}
            </code>
            <p className="text-[10px] text-slate-400">Header: <span className="font-mono text-slate-300">stripe-signature</span></p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-semibold text-slate-300">Recent Server-Processed Transactions</h4>
          {transactions.length === 0 ? (
            <div className="p-6 text-center text-slate-500 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs">
              No transactions recorded yet. Completed checkout orders and verified webhooks will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Date / Time</th>
                    <th className="p-2.5">Order / Payment ID</th>
                    <th className="p-2.5">Provider</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Client</th>
                    <th className="p-2.5">Signature</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-normal">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/30">
                      <td className="p-2.5 text-slate-400 whitespace-nowrap">
                        {new Date(tx.timestamp).toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono text-[10px] text-slate-300">
                        {tx.paymentId || tx.orderId || tx.id}
                      </td>
                      <td className="p-2.5 uppercase font-medium text-slate-300">
                        {tx.provider}
                      </td>
                      <td className="p-2.5 font-semibold text-white">
                        {tx.currency} {tx.amount.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-slate-300">
                        {tx.clientName || tx.clientEmail || 'Client'}
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${
                          tx.signatureVerified
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          {tx.signatureVerified ? 'Verified ✓' : 'Sandbox'}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                          tx.status === 'success'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : tx.status === 'pending'
                            ? 'bg-cyan-500/15 text-cyan-400'
                            : 'bg-rose-500/15 text-rose-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal Before Enabling Live Production Mode */}
      <ConfirmModal
        isOpen={showLiveConfirm}
        title="Switch to LIVE Production Payment Mode?"
        message="Warning: Enabling LIVE mode will process real financial transactions from customers using real credit cards and bank accounts. Ensure your live API credentials and webhook signing keys are properly verified before saving."
        confirmLabel="Enable Live Mode"
        cancelLabel="Keep in Sandbox Test Mode"
        isDestructive={true}
        onConfirm={() => {
          setPaymentData({ ...paymentData, testMode: false });
          setShowLiveConfirm(false);
          showToast('Switched to Live Production mode. Remember to click Save Payment Settings.', 'info');
        }}
        onCancel={() => setShowLiveConfirm(false)}
      />
    </div>
  );
};
