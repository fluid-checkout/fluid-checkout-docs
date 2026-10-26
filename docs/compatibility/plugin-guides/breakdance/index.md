---
title: "Compatibility with plugin Breakdance"
description: "Because Breakdance does not differentiate the header section from other sections with a discernible id or class, it is necessary to add either the class..."
sidebar_label: "Breakdance"
slug: /plugins/breakdance
---

# Compatibility with plugin Breakdance

## Header classes {/* #header-classes */}

Because Breakdance does not differentiate the header section from other sections with a discernible `id` or `class`, it is necessary to add either the class `.bde-header` or `.bde-header--sticky` to the header section manually in the Breakdance header template.

If the header section does not contain at least one of these classes, a few layout issues might happen:

- The dropdown menus might appear behind some checkout page elements.
- Fluid Checkout will not know where to position the progress bar and order summary sections, and some checkout elements might appear in front of the header section if the header section is set as `sticky`.

Follow the steps below to add the required classes to the header section:

1. Go to WP Admin > Breakdance > Headers.
2. Choose a header template to edit, then choose the option “Edit in Breakdance”.
3. In the Breakdance editor, select the main header section by clicking on it.
4. On the sidebar of the Breakdance editor, switch to the section “Settings (cog icon)” tab.
5. Expand the section “Advanced” in the settings tab.
6. Locate the “Classes” fields, then add a new class. You should enter either `.bde-header` or `.bde-header-sticky` depending on whether the header section is set as `sticky` or not, that is, if the header section stays visible at all times while scrolling down the page.
7. Save your changes to the header template.
