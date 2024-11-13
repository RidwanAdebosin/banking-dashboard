const Navigation = () => {
  const currencyRate = () => {};
  const todaysDate = () => {
    new Date();
  };

  return (
    <nav>
      <ul className="flex gap-3 items-center text-white">
        <li className="text-white">
          Updated currency rate as at {todaysDate} {currencyRate}
        </li>
        <li>Welcome Admin</li>
        <li className="rounded-full bg-white w-10 h-10 cursor-pointer"></li>
      </ul>
    </nav>
  );
};
export default Navigation;
