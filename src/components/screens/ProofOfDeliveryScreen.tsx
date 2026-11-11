import React, { useState } from 'react';
import { ScreenId } from '../../types/logistics';
import { POD_VERIFICATION_PHOTO } from '../../data/logisticsData';

interface ProofOfDeliveryScreenProps {
  onNavigate?: (screen: ScreenId) => void;
  onDeliveryComplete?: (trackingId: string) => void;
}

export const ProofOfDeliveryScreen: React.FC<ProofOfDeliveryScreenProps> = ({
  onNavigate,
  onDeliveryComplete,
}) => {
  const [recipientName, setRecipientName] = useState('Folake Balogun');
  const [designation, setDesignation] = useState('Chief Operations Officer / Authorized Officer');
  const [hasSignature, setHasSignature] = useState(true);
  const [deliveryCondition, setDeliveryCondition] = useState<'intact' | 'damaged'>('intact');
  const [remarks, setRemarks] = useState('Handed over directly to security reception desk signee.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyWaybill = () => {
    navigator.clipboard?.writeText('DMS-TRK-98421');
    setCopied(true);
    showToast('Tracking ID copied: DMS-TRK-98421');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDelivery = () => {
    if (!hasSignature) {
      showToast('Recipient signature is required before sign-off');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      onDeliveryComplete?.('#DMS-TRK-98421');
    }, 1200);
  };

  return (
    <div className="w-full sm:max-w-[420px] mx-auto bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative shadow-none sm:shadow-2xl border-0 sm:border border-outline-variant/30 overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary text-xs px-4 py-2 rounded-full shadow-lg border border-secondary-container/40 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl border border-secondary-container/30 animate-in fade-in zoom-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="text-xl font-headline-xl font-bold text-on-surface">Delivery Confirmed!</h3>
            <p className="text-xs text-on-surface-variant mt-1.5">
              Consignment <span className="font-code-md font-bold text-primary">#DMS-TRK-98421</span> has been marked as officially delivered.
            </p>

            <div className="bg-surface-container-low rounded-lg p-3 my-4 text-left space-y-1 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Signee:</span>
                <span className="font-semibold text-on-surface">{recipientName}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Timestamp:</span>
                <span className="font-code-sm text-on-surface">Oct 24, 14:38 WAT</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Condition:</span>
                <span className="font-semibold text-emerald-600">Tamper Seal Verified Intact</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigate?.('admin-dashboard')}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all cursor-pointer"
              >
                View in Dispatch Center
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('driver-dashboard')}
                className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all cursor-pointer"
              >
                Back to Driver Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(20,43,69,0.06)]">
        <div className="h-14 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('driver-dashboard')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="font-headline-sm text-base font-bold text-on-surface truncate">
              Proof Of Delivery
            </h1>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Stack */}
      <main className="flex-1 px-4 pt-3 pb-8 space-y-3.5">
        {/* Waybill & Package Summary Operational Card */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-2.5 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-code-sm text-xs font-semibold tracking-wider">
                #DMS-TRK-98421
              </span>
              <button
                type="button"
                onClick={copyWaybill}
                title="Copy Tracking ID"
                className="text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">{copied ? 'done' : 'content_copy'}</span>
              </button>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-primary-container text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              Final Clearance
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-0.5">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[18px]">domain</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Recipient Entity</p>
              <p className="font-headline-sm text-sm font-bold text-on-surface truncate">Standard Bank Plc</p>
              <p className="text-xs text-on-surface-variant truncate">Kingsway Tower, Ikoyi, Lagos</p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between border border-outline-variant/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">verified_user</span>
              <div className="min-w-0">
                <p className="text-xs text-on-surface font-semibold truncate">Secure Vault Bag (0.8kg)</p>
                <p className="font-code-sm text-[10px] text-on-surface-variant truncate">Tamper Seal: #SEAL-9921</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-semibold">
              High Value
            </span>
          </div>
        </div>

        {/* Form Section 1: Recipient Identity Confirmation */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-3 border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">Recipient Identity Confirmation</h2>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Receiver Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface text-xs rounded-lg px-3 py-2 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant text-[18px]">
                  badge
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Role / Designation
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface text-xs rounded-lg px-3 py-2 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant text-[18px]">
                  shield_person
                </span>
              </div>
            </div>

            <div className="pt-0.5">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Phone Verification (SMS OTP)
              </label>
              <div className="flex items-center justify-between bg-surface-container-low rounded-lg p-2.5 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="font-code-md text-xs tracking-widest text-on-surface font-bold bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">
                    8 3 9 2
                  </span>
                  <span className="text-xs text-on-surface-variant">+234 ••• ••• 4192</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface bg-surface-container-high px-2 py-1 rounded-full text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-secondary font-bold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section 2: Digital Recipient Signature Pad */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-2 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                2
              </div>
              <h2 className="font-headline-sm text-sm font-bold text-on-surface">Recipient Signature</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasSignature(!hasSignature);
                showToast(hasSignature ? 'Signature cleared. Touch canvas to sign.' : 'Signature restored');
              }}
              className="text-[11px] text-secondary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              {hasSignature ? 'Clear Signature' : 'Restore Signature'}
            </button>
          </div>

          {/* Authentic Signature Canvas Area */}
          <div
            onClick={() => !hasSignature && setHasSignature(true)}
            className="relative w-full h-32 bg-surface-container-low rounded-lg overflow-hidden flex flex-col justify-between p-2.5 select-none border border-outline-variant/10 cursor-pointer"
          >
            <div className="flex items-center justify-between text-on-surface-variant/60 font-code-sm text-[10px]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">draw</span>
                Legal Attestation
              </span>
              <span>Oct 24, 2024 - 14:38:12 UTC+1</span>
            </div>

            {/* Signature Visual Render */}
            <div className="relative flex-1 flex items-center justify-center">
              {hasSignature ? (
                <svg
                  className="w-4/5 h-16 text-primary-container opacity-90 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 320 80"
                >
                  <path d="M 20 62 C 35 25, 45 10, 60 18 C 72 25, 68 65, 78 68 C 88 70, 95 40, 115 48 C 130 54, 135 65, 150 60 C 165 55, 172 35, 185 40 C 205 48, 220 70, 245 42 C 265 20, 280 50, 305 38" />
                  <path d="M 65 38 L 110 36" strokeWidth="2" />
                  <circle cx="290" cy="24" fill="currentColor" r="2.5" stroke="none" />
                </svg>
              ) : (
                <div className="text-center py-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">edit</span>
                  <p className="text-on-surface-variant text-xs font-semibold">Touch here to sign on screen</p>
                </div>
              )}
            </div>

            <div className="border-t border-surface-container-highest pt-1 flex justify-between items-center text-on-surface-variant text-[10px]">
              <span className="font-mono">X _______________________</span>
              <span className="font-medium">{recipientName} (Signee)</span>
            </div>
          </div>
        </div>

        {/* Form Section 3: Delivery Photo Verification */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-2.5 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                3
              </div>
              <h2 className="font-headline-sm text-sm font-bold text-on-surface">Photo Verification</h2>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-semibold">
              1 Captured
            </span>
          </div>

          {/* Handover Picture Frame with Geotag Overlay */}
          <div className="relative w-full h-44 rounded-lg overflow-hidden shadow-inner group border border-outline-variant/10">
            <img
              src={POD_VERIFICATION_PHOTO}
              alt="Proof of Delivery Handover"
              className="w-full h-full object-cover"
            />
            {/* Translucent Telemetry & Geotag Watermark Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-primary-container/85 backdrop-blur-sm p-2 text-on-primary space-y-0.5">
              <div className="flex items-center justify-between font-code-sm text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary-container">pin_drop</span>
                  Lat: 6.4531° N, Lon: 3.4285° E
                </span>
                <span className="text-on-primary-container">Acc: ±2.1m</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-surface-container-highest">
                <span>Kingsway Tower Security Lobby • Desk 02</span>
                <span>14:38:29 UTC+1</span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Media Capture */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => showToast('Opening device camera for re-capture')}
              className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              Retake Photo
            </button>
            <button
              type="button"
              onClick={() => showToast('Secondary package angle added')}
              className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
              Add Angle
            </button>
          </div>
        </div>

        {/* Form Section 4: Delivery Notes & Condition */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm space-y-3 border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
              4
            </div>
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">Condition &amp; Dispatch Notes</h2>
          </div>

          {/* Condition Radio Options */}
          <div className="space-y-2">
            <label
              onClick={() => setDeliveryCondition('intact')}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors border ${deliveryCondition === 'intact' ? 'bg-surface-container border-secondary/40' : 'bg-surface-container-low border-transparent'}`}
            >
              <input
                type="radio"
                name="deliveryCondition"
                value="intact"
                checked={deliveryCondition === 'intact'}
                onChange={() => setDeliveryCondition('intact')}
                className="w-4 h-4 text-secondary accent-secondary focus:ring-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-on-surface">Delivered in Good Condition</p>
                <p className="text-[11px] text-on-surface-variant truncate">Seals intact, no packaging damage</p>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </label>

            <label
              onClick={() => setDeliveryCondition('damaged')}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors border ${deliveryCondition === 'damaged' ? 'bg-error-container/40 border-error' : 'bg-surface-container-low border-transparent'}`}
            >
              <input
                type="radio"
                name="deliveryCondition"
                value="damaged"
                checked={deliveryCondition === 'damaged'}
                onChange={() => setDeliveryCondition('damaged')}
                className="w-4 h-4 text-secondary accent-secondary focus:ring-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-on-surface">Damaged Packaging / Seal Tampered</p>
                <p className="text-[11px] text-on-surface-variant truncate">Requires immediate security escalation</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">warning</span>
            </label>
          </div>

          {/* Optional Courier Remarks */}
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Courier Delivery Remarks
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface text-xs rounded-lg p-2.5 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all resize-none border border-outline-variant/10"
            />
          </div>
        </div>

        {/* Section 5: Primary Action CTAs */}
        <div className="space-y-2 pt-1">
          {/* Primary Confirmation Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmDelivery}
            className="w-full h-12 rounded-xl bg-secondary-container hover:bg-secondary text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                Transmitting Cryptographic POD...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Confirm &amp; Complete Delivery
              </>
            )}
          </button>

          {/* Secondary Exception Handling Button */}
          <button
            type="button"
            onClick={() => showToast('Issue escalated to Ikeja Central Dispatch Station')}
            className="w-full h-11 rounded-xl bg-surface-container-lowest hover:bg-error-container text-error text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors border border-outline-variant/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            Report Issue / Customer Unavailable
          </button>
        </div>
      </main>
    </div>
  );
};
