---
title: "Compatibility with plugin Nextend Social Login"
description: "Fluid Checkout only ever outputs the Nextend “Connect” buttons of social login providers in one spot on the checkout page: inside the contact section..."
sidebar_label: "Nextend Social Login"
slug: /plugins/nextend-social-login
---

# Compatibility with plugin Nextend Social Login

## Checkout layout options

Fluid Checkout only ever outputs the Nextend “Connect” buttons of social login providers in one spot on the checkout page: inside the contact section between the contact fields (email, name) and the login section, regardless of the position option selected in the Nextend Social Login plugin settings.

The reason we do this is because this position is the only one that makes sense when using Fluid Checkout.

## How to enable Nextend Social buttons

In order to use Nextend with Fluid Checkout, you do not need to enable any compatibility option on Fluid Checkout settings but you might need select specific settings within the Nextend Social Login plugin settings.

First you need to ensure you have configured the connection to the Social Login provider or social networks within the Nextend Social Plugin settings. [Please check their documentation for more details](https://social-login.nextendweb.com/documentation/providers/).

The integration is configured within the Nextend Social Login settings, specifically in the billing section.

- Go to WP Admin > Settings > Nextend Social Login > Global Settings > WooCommerce;
- In the “Billing form” option, select any value other than “No Connect button in billing form”;
- Set the Billing layout to Default;
- Save the changes.
