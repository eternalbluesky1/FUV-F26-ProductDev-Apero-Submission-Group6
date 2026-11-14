import type { EligibilityKind } from "@/lib/types";

const labels: Record<EligibilityKind, string> = {
  student_only: "Sinh viên",
  age_based: "Theo độ tuổi",
  member: "Thành viên",
  referral: "Giới thiệu",
  general: "Chung",
  student_verified_education: "Xác minh sinh viên"
};

const tone: Record<EligibilityKind, string> = {
  student_only: "bg-brand-purple/10 text-brand-purple",
  age_based: "bg-brand-yellow/25 text-ink",
  member: "bg-brand-mint/15 text-success",
  referral: "bg-brand-pink/15 text-[#9d174d]",
  general: "bg-surface text-muted",
  student_verified_education: "bg-brand-purple/10 text-brand-purple"
};

export function EligibilityBadge({ kind }: { kind: EligibilityKind }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone[kind]}`}>
      {labels[kind]}
    </span>
  );
}
