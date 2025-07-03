import Image from "next/image";

import { TOP_CATEGORY_STYLES } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

const Category = ({ category }: CategoryProps) => {
  const { bg, circleBg, text, progress, icon } =
    TOP_CATEGORY_STYLES[category.name as keyof typeof TOP_CATEGORY_STYLES] ||
    TOP_CATEGORY_STYLES.default;

  const { main, count } = text;
  const { bg: progressBg, indicator} = progress;

  const value = (category.count/category.totalCount)*100;

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>

      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-[14px] flex justify-between">
          <h2 className={cn("font-medium", main)}>{category.name}</h2>
          <h3 className={cn("font-normal", count)}>{category.count}</h3>
        </div>

        <Progress 
            value={value}
            className={cn("h-2 w-full", progressBg)}
            indicatorClass={indicator}
        />
      </div>
    </div>
  );
};

export default Category;
