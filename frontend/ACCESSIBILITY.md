# Accessibility Implementation Guide

## Standards Compliance
This frontend meets WCAG 2.1 Level AA standards with considerations for AAA where practical.

## Keyboard Navigation

### Global
- `Tab` - Navigate between focusable elements
- `Shift+Tab` - Navigate backward
- `Enter` - Activate buttons/links
- `Space` - Toggle checkboxes, open dropdowns
- `Escape` - Close modals, dropdowns, menus
- `Arrow Keys` - Navigate within dropdowns/lists

### Page-Specific
- **Chat Input** - `Enter` to send, `Shift+Enter` for newline
- **Leaderboard** - Arrow keys to navigate rows (sortable)
- **Lobby** - Enter to join queue, Escape to cancel

## Screen Reader Support

### ARIA Labels
- All buttons have meaningful labels
- Form inputs have associated labels
- Live regions announce real-time updates
- Icons have `aria-hidden="true"` when decorative

### Semantic HTML
- Proper heading hierarchy: h1 → h2 → h3
- Form elements use `<label>` with `htmlFor`
- Buttons use `<button>` (not `<div>` with click)
- Links use `<a>` with meaningful text

### Dynamic Content
- Chat messages: `aria-live="polite"` regions
- Loading states: Spinner with status updates
- Form validation: Error messages associated with fields
- Modals: `aria-modal="true"` and `aria-labelledby`

## Motion & Animation

### Prefers-Reduced-Motion
All animations respect the `prefers-reduced-motion` media query:
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

### Guidelines
- No auto-playing videos
- No flashing elements (>3 times/second)
- Parallax effects reduced for those with vestibular disorders
- Animations have safe fall-backs

## Color & Contrast

### Text Contrast
- Normal text (≥14px): 4.5:1 minimum
- Large text (≥18px bold or ≥24px): 3:1 minimum
- All interactive elements: 3:1 minimum

### Color Independence
- Information not conveyed by color alone
- Error states use icons + text, not just red
- Links identified by underline or other means

### Color Palette
- Checked in tools like WebAIM contrast checker
- Suitable for colorblind users (deuteranopia, protanopia)
- High saturation for visibility

## Form Accessibility

### Input Fields
- Labels associated with `htmlFor`
- Required fields marked with `aria-required="true"`
- Validation messages linked via `aria-describedby`
- Clear focus states with 2px ring

### Error Handling
- Error messages appear near input
- Focus moves to first error
- Errors announced to screen readers
- Clear instructions for correction

## Interactive Components

### Modals
- Focus trapped within modal
- Backdrop provides visual separation
- `aria-modal="true"` attribute set
- Escape key closes modal
- Focus returns to trigger element

### Dropdowns
- `aria-expanded` state updated
- `aria-haspopup="true"` on trigger
- `aria-owns` connects trigger to menu
- Arrow keys navigate items
- Enter/Space selects item

### Buttons
- Minimum 44x44px tap target (WCAG 2.1 AAA)
- Visible focus indicator
- States clearly distinguishable
- Disabled state has reduced opacity

## Responsive Design

### Zoom
- Content remains usable at 200% zoom
- No horizontal scrolling at standard zoom
- Text resizable without loss of functionality

### Text Size
- Text can be resized 200% without loss of content
- Line height ≥1.5 for body text
- Spacing ≥1.5x font size around text

### Mobile
- Touch targets ≥44x44px
- Sufficient spacing between interactive elements
- Readable font size (≥16px base)
- Easy to use with one hand

## Testing Checklist

- [ ] Keyboard navigation works on all pages
- [ ] Screen reader announces all content correctly
- [ ] Focus visible on all interactive elements
- [ ] Color contrast meets AA standards
- [ ] No content flashes >3 times/second
- [ ] Prefers-reduced-motion is respected
- [ ] Forms are properly labeled and error-handled
- [ ] Modals have focus trap
- [ ] Mobile layout works with zoom to 200%
- [ ] Text resizable without content overflow
- [ ] All images have alt text (or marked decorative)
- [ ] Skip-to-content link available
- [ ] Language marked in HTML
- [ ] Date formats are understandable
- [ ] Instructions don't rely on shape/location alone

## Tools & Testing

### Automated Testing
- axe DevTools for accessibility scan
- Lighthouse accessibility audit
- Wave browser extension

### Manual Testing
- Keyboard-only navigation
- Screen reader (NVDA, JAWS, VoiceOver)
- Zoom to 200% and 300%
- Disable CSS to verify structure
- High contrast mode in Windows

### Browser DevTools
- Chrome DevTools > Accessibility tree
- Firefox Inspector > Accessibility panel
- Safari > Developer > Accessibility audit

## Resources
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/
- MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility
</CHANGE>
