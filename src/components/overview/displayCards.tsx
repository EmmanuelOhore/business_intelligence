type DisplayCardProps = {
  title: string;
  value: string;
  change?: string;
  isUp?: boolean;
  featured?: boolean;
};

const DisplayCard = ({
  title,
  value,
  change = "+5%",
  isUp = true,
  featured = false,
}: DisplayCardProps) => {
  return (
    <article
      className={`
        bg-white p-4 rounded-lg  shadow-md flex flex-col justify-between h-full
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-phoneL:rounded-md max-phoneL:outline
      `}
    >
      <div>
        <h2
          className={`text-lg font-semibold  max-tablet:text-base max-phoneL:text-sm`}
        >
          {title}
        </h2>
        <h3
          className={`text-3xl font-bold mt-2 max-tablet:text-2xl max-tablet:mt-1 max-phoneL:text-xl `}
        >
          {value}
        </h3>
      </div>
      <div
        className={`text-sm mt-4 max-tablet:mt-2 max-phoneL:text-xs ${
          isUp ? "text-green-500" : "text-red-500"
        }`}
      >
        {isUp ? "↑" : "↓"} {change} from last week
      </div>
    </article>
  );
};

export default DisplayCard;
