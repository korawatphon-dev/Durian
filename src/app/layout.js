import './globals.css';

export const metadata = {
  title: 'Thai Durian Intelligence Dashboard - National & Eastern Edition',
  description: 'ศูนย์รวมข้อมูลสด สถิติติดตามการผลิต GAP/DOA และเทคโนโลยีดาวเทียม GISTDA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body class="text-slate-800 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
