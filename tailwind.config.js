/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/public/**/*.{html,js}"],
  safelist: [
    // Grid and layout classes
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'gap-2', 'gap-4', 'gap-6', 'gap-8',
    'flex', 'flex-col', 'flex-row', 'items-center', 'justify-center', 'justify-between',
    'w-full', 'h-full', 'w-4', 'h-4', 'w-5', 'h-5', 'w-6', 'h-6',
    'text-white', 'text-black', 'text-sm', 'text-lg', 'text-xl', 'text-2xl',
    'bg-black', 'bg-white', 'bg-opacity-50', 'bg-opacity-75', 'bg-opacity-90',
    'absolute', 'relative', 'fixed', 'inset-0', 'top-0', 'left-0', 'right-0', 'bottom-0',
    'p-2', 'p-4', 'p-6', 'p-8', 'px-2', 'px-4', 'px-6', 'py-2', 'py-4', 'py-6',
    'm-2', 'm-4', 'mx-auto', 'my-2', 'my-4',
    'rounded', 'rounded-lg', 'rounded-full',
    'shadow', 'shadow-lg', 'shadow-xl',
    'opacity-0', 'opacity-50', 'opacity-75', 'opacity-100',
    'transition', 'transition-all', 'duration-300', 'ease-in-out',
    'hover:opacity-75', 'hover:scale-105',
    'cursor-pointer',
    'z-10', 'z-20', 'z-50',
    // Color classes for themes
    'from-pink-600', 'to-pink-500', 'from-pink-900', 'to-pink-700',
    'from-lime-600', 'to-lime-500', 'from-lime-900', 'to-lime-700',
    'from-indigo-700', 'to-indigo-600', 'from-indigo-900', 'to-indigo-800',
    'from-red-500', 'to-red-400', 'from-red-800', 'to-red-700',
    'from-red-700', 'to-red-600', 'from-red-900', 'to-red-800',
    'from-blue-500', 'to-blue-400', 'from-blue-900', 'to-blue-700',
    'from-gray-600', 'to-gray-400', 'from-gray-900', 'to-gray-700',
    // Mobile responsive
    'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4',
    'sm:text-lg', 'md:text-xl', 'lg:text-2xl',
    'sm:p-4', 'md:p-6', 'lg:p-8'
  ],
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