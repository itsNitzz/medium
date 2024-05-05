import NotificationBell from "../icons/NotificationBell";

export default function Header() {
  return (
    <header className="mx-10">
      <nav className="flex justify-between items-center h-16">
        <div className="flex  gap-3">
          <span></span>
          <p className="font-medium">Draft in Kirags</p>
          <p className="text-slate-400">Saved</p>
        </div>
        <div className="flex items-center  gap-5">
          <button className="text-white text-sm tracking-[1px] rounded-full py-[3px] px-3 bg-green-400">Publish</button>
          <span className="mb-2 font-bold">...</span>
          <NotificationBell />
          <span className="inline-block  w-7 h-7 text-white bg-green-900 text-center rounded-full ">h</span>
        </div>
      </nav>
    </header>
  );
}
