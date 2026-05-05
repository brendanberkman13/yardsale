import { CONDITION_LABELS, type Condition } from "@/lib/types";

type Props = {
  condition: Condition;
};

export function ConditionBadge({ condition }: Props) {
  return (
    <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
      {CONDITION_LABELS[condition]}
    </span>
  );
}
