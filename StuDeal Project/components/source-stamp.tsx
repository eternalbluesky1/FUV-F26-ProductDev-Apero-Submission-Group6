import { formatDate } from "@/lib/utils";

export function SourceStamp({
  checkedAt,
  sourceUrl
}: {
  checkedAt: string;
  sourceUrl: string;
}) {
  return (
    <p className="text-xs text-muted">
      Nguồn chính thức, kiểm tra {formatDate(checkedAt)}.{" "}
      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="font-semibold text-brand-purple underline underline-offset-2"
      >
        Xem nguồn
      </a>
    </p>
  );
}
