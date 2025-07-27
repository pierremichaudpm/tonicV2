/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/public/**/*.{html,js}"],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'white',
            '--tw-prose-headings': 'white',
            '--tw-prose-lead': 'white',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': 'white',
            '--tw-prose-bullets': 'white',
            '--tw-prose-hr': 'white',
            '--tw-prose-quotes': 'white',
            '--tw-prose-quote-borders': 'white',
            '--tw-prose-captions': 'white',
            '--tw-prose-code': 'white',
            '--tw-prose-pre-code': 'white',
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': 'white',
            '--tw-prose-td-borders': 'white',
          }
        }
      }
    }
  },
  plugins: [],
}