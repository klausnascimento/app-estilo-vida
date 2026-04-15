import { Card } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success" | "danger";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : "text-brand";

  return (
    <Card className="space-y-2">
      <p className="text-sm text-muted">{label}</p>
      <p className={`text-2xl font-semibold ${toneClass}`}>{value}</p>
    </Card>
  );
}
