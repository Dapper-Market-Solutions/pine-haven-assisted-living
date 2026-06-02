// Semantic dataLayer event layer. Push business events here; map them to
// GA4 / Meta Pixel+CAPI / Google Ads conversions in the GTM UI — no code
// change needed to turn ad tracking on or off.
//
// Events are queued on window.dataLayer even before GTM loads (Consent Mode
// holds them until consent), so nothing is lost.

export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Standard conversion event for any lead/contact form submission.
// In GTM, trigger your GA4 "generate_lead", Meta "Lead", and Google Ads
// conversion off this single event.
export function trackLead({ formName, value, currency = 'USD', ...rest } = {}) {
  track('generate_lead', {
    form_name: formName,
    ...(value != null ? { value, currency } : {}),
    ...rest,
  });
}
