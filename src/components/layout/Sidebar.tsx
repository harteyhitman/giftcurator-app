import Nav from './Nav';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 flex-col hidden h-full p-4 border-r w-60 bg-background sm:flex">
      <div className="flex items-center h-16 mb-4">
        <span className="text-xl font-bold">GiftCurator</span>
      </div>
      <Nav />
    </aside>
  );
}
