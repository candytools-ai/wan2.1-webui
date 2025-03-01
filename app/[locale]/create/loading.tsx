import { SkeletonSection } from "@/components/shared/section-skeleton";

export default function CreationDashboardLoading() {
  return (
    <>
      <div className="divide-y divide-muted pb-10">
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection card />
      </div>
    </>
  );
}
