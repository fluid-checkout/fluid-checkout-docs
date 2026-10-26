---
title: "Compatibility with plugin Mailchimp for WooCommerce"
description: "When using Fluid Checkout, the ideal position to show the subscribe box from the Mailchimp plugin is below the email field in the contact step."
sidebar_label: "Mailchimp"
slug: /plugins/mailchimp
---

# Compatibility with plugin Mailchimp for WooCommerce

## Position for the subscribe checkbox {/* #subscribe-box */}

When using Fluid Checkout, the ideal position to show the subscribe box from the Mailchimp plugin is below the email field in the contact step.

By default, Mailchimp would display the subscribe checkbox after the billing address fields, and because the email field is moved to the contact step, Fluid Checkout needs to force the subscribe box to move the to contact step as well, regardless of the position set in the Mailchimp plugin settings.

In case you need to move the Mailchimp subscribe box to another place on the checkout page, you will need to disable the option to force moving it to the contact step in the Fluid Checkout integration settings:

1. Go to WP Admin > Fluid Checkout > Settings > Integrations.
2. Locate the section “Mailchimp for WooCommerce”. Keep in mind that it will only be displayed if the Mailchimp plugin is currently active.
3. Uncheck the option *“Override the position for the subscribe checkbox on the checkout page and always display it on the contact step”*.
4. Save your changes.

At this point, the position for the subscribe box will be that defined in the Mailchimp plugin settings.
