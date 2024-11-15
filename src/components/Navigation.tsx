const Navigation = () => {
  // const currencyRate = () => {};
  // const todaysDate = () => {
  //   new Date();
  // };

  return (
    <nav>
      <ul className="flex gap-3 items-center dark:text-white">
        {/* <li className="dark:text-white">
          Updated currency rate as at {} {}
        </li> */}
        <li>Welcome Admin</li>
        <li className="rounded-full bg-white min-w-10 h-10 cursor-pointer"></li>
      </ul>
    </nav>
  );
};
export default Navigation;
