import { TRANSACTIONS_CATEGORY_STYLES } from "@/constants";
import { cn } from "@/lib/utils";

interface CategoryBadgesProps {
  category: string;
}

const CategoryBadges = ({ category }: CategoryBadgesProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    TRANSACTIONS_CATEGORY_STYLES[
      category as keyof typeof TRANSACTIONS_CATEGORY_STYLES
    ] || TRANSACTIONS_CATEGORY_STYLES.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

export default CategoryBadges;
