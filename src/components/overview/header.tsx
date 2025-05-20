const Header = () => {
  const data = localStorage.getItem("session");
  const user = data ? JSON.parse(data) : null;
  return (
    <header className="flex gap-6 border-b border-gray-300  p-2 sticky top-0 z-20 bg-white backdrop-blur-lg max-tablet:gap-1 max-phoneL:p-1 ">
      <section className="flex items-center border-r gap-4  px-4 justify-between flex-1 max-tablet:px-0 max-tablet:pr-2 ">
        <article className="w-[70%]  max-tablet:flex-1 ">
          <input
            type="text"
            placeholder="Search"
            className="w-[100%] h-10 rounded-sm border-2 border-gray-300 p-2 max-phoneL:h-8 max-phoneL:rounded max-phoneL:placeholder:text-xs max-phoneL:text-xs max-phoneP:h-6"
          />
        </article>
        <article className="flex items-center gap-4  ">
          <div className="max-phoneL:hidden">
            <button className="bg-[#FEF4EE] text-[#F97C25] px-8 py-2 rounded-md max-laptop:text-xs max-tablet:px-4 max-tablet:py-2 max-tablet:text-sm">
              <i className="fa-solid fa-circle-exclamation mr-2"></i> Alarm
            </button>
          </div>
          <div className="relative">
            <i className="fa-solid fa-bell text-[#363A42] text-lg max-phoneL:text-sm max-phoneP:text-xs "></i>
            <p className=" absolute top-[-50%] right-[-80%] p-1 px-1.5 text-white bg-red-500 rounded-full text-[8px] max-phoneL:text-[8px] max-phoneL:top-[-20%] max-phoneL:px-1 max-phoneL:py-0.5 ">
              11
            </p>
          </div>
        </article>
      </section>

      <section className="flex items-center justify-end gap-2  w-[20%] max-tablet:w-[25%] max-phoneL:w-[35%]">
        <div className="w-[2rem] h-[2rem] rounded-full bg-[#96908c] flex items-center justify-center max-phoneL:w-[1.5rem] max-phoneL:h-[1.5rem] max-phoneP:w-[1.3rem] max-phoneP:h-[1.2rem]">
          <i className="fa-solid fa-user text-base  text-white max-tablet:text-sm  max-phoneL:text-xs max-phoneL:text-[9px] max-phoneP:text-[8px]"></i>
        </div>
        <div className="flex  items-center">
          <h2 className="text-[#363A42] text-sm font-semibold max-phoneL:text-[11px] max-phoneP:text-[9px]">
            {user?.user?.name}
          </h2>
          <i className="fa-solid fa-chevron-down ml-2 text-sm max-phoneL:text-[8px]"></i>
        </div>
      </section>
    </header>
  );
};

export default Header;
