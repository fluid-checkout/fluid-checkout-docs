---
title: "Compatibility with plugin Digits"
description: "We have added partial compatibility with the plugin Digits by UnitedOver with version 3.0.3."
sidebar_label: "Digits"
slug: /plugins/digits
---

# Compatibility with plugin Digits

## Partial compatibility with the plugin Digits

We have added partial compatibility with the plugin Digits by UnitedOver with version 3.0.3.

The compatibility fixes are:

- Email/Mobile phone field on the login form now works as expected with Digits and Fluid Checkout Lite 3.0.3+.
- Automatically disabling the [international phone field feature from Fluid Checkout PRO](https://fluidcheckout.com/docs/feature-international-phone-numbers/) when using Digits, as these features conflict with each other.

However, there are **some issues with were not possible to be fixed** from our side and will require the team at UnitedOver to make changes to the Digits plugin directly to make it fully compatible with Fluid Checkout.

We urge you to [contact UnitedOver and ask them to implement the necessary changes](https://help.unitedover.com/contact/) on the Digits plugin.

The issues that were not possible to be fixed from our side are explained in the sections below.

## Phone number and email are not verified when completing the contact step {/* #step-validation */}

When using the multi-step checkout layout of Fluid Checkout, the phone and email fields will not be verified with Digits when completing the contact step (proceeding to next step) or when saving changes to the contact section after moving to other steps.

Verifying phone numbers and email addresses with Digits require that a one-time-passcode (OTP) be sent via SMS, WhatsApp or email.

Unfortunately, Digits does not provide a way for Fluid Checkout to trigger sending the OTP code for verification. Digits will only send the OTP code for verification when the customer tries to place an order at the end of the checkout process.

## Phone fields not showing the country code dropdown

When the shipping phone or billing phone fields are displayed inside the respective sub-step sections, these fields will show the country code but it will soon removed.

This happens because Digits does not expect the shipping address and billing address fields to be replaced when parts of the checkout page (fragments) are replaced.

This is a common issue with Fluid Checkout as explained on our documentation article [Troubleshooting: jQuery events or vanilla JavaScript events not working](https://fluidcheckout.com/docs/troubleshoot-js-events/). Although explained for jQuery Events, the same applies for changes to checkout field or other elements.
