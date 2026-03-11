import Nav from './Nav';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 flex-col hidden h-full p-6 border-r border-primary/5 w-64 bg-background sm:flex shadow-sm">
      <div className="flex items-center h-16 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-primary/20">G</div>
        <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">GiftCurator</span>
      </div>
      <Nav />
    </aside>
  );
}
