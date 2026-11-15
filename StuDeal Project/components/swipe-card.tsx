"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode
} from "react";

type SwipeDirection = "save" | "skip";

const CLICK_TOLERANCE_PX = 8;
const EDGE_MARGIN_PX = 160;
const EXIT_DURATION_MS = 300;
const MAX_ROTATION_DEG = 14;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SwipeCard({
  children,
  onSwipe
}: {
  children: ReactNode;
  onSwipe: (direction: SwipeDirection) => void;
}) {
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(null);

  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<"x" | "y" | null>(null);
  const threshold = useRef(90);
  const moved = useRef(false);
  const suppressClick = useRef(false);
  const suppressTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (suppressTimer.current !== null) window.clearTimeout(suppressTimer.current);
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
    };
  }, []);

  function resetDrag() {
    pointerId.current = null;
    axis.current = null;
    moved.current = false;
    setDragging(false);
    setOffsetX(0);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (exitDirection !== null) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (pointerId.current !== null) return;

    pointerId.current = event.pointerId;
    startX.current = event.clientX;
    startY.current = event.clientY;
    axis.current = null;
    moved.current = false;
    threshold.current = Math.min(140, Math.max(72, event.currentTarget.clientWidth * 0.25));
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) return;

    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;

    if (axis.current === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      axis.current = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
    }

    if (axis.current !== "x") return;

    if (Math.abs(dx) > CLICK_TOLERANCE_PX) moved.current = true;
    setDragging(true);
    setOffsetX(dx);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) return;

    const dx = event.clientX - startX.current;
    pointerId.current = null;

    if (axis.current !== "x") {
      resetDrag();
      return;
    }

    if (moved.current) {
      suppressClick.current = true;
      if (suppressTimer.current !== null) window.clearTimeout(suppressTimer.current);
      suppressTimer.current = window.setTimeout(() => {
        suppressClick.current = false;
        suppressTimer.current = null;
      }, 400);
    }

    const passedThreshold = Math.abs(dx) >= threshold.current;

    if (!passedThreshold) {
      resetDrag();
      return;
    }

    const direction: SwipeDirection = dx > 0 ? "save" : "skip";
    setDragging(false);

    if (prefersReducedMotion()) {
      setOffsetX(0);
      onSwipe(direction);
      return;
    }

    const distance = window.innerWidth + EDGE_MARGIN_PX;
    setExitDirection(direction);
    setOffsetX(direction === "save" ? distance : -distance);
    exitTimer.current = window.setTimeout(() => {
      exitTimer.current = null;
      onSwipe(direction);
    }, EXIT_DURATION_MS);
  }

  function handlePointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) return;
    resetDrag();
  }

  function handleClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    if (suppressTimer.current !== null) {
      window.clearTimeout(suppressTimer.current);
      suppressTimer.current = null;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  const exiting = exitDirection !== null;
  const progress = Math.min(Math.abs(offsetX) / threshold.current, 1);
  const rotation = exiting
    ? exitDirection === "save"
      ? MAX_ROTATION_DEG
      : -MAX_ROTATION_DEG
    : Math.max(-MAX_ROTATION_DEG, Math.min(MAX_ROTATION_DEG, offsetX * 0.05));
  const transition = dragging ? "none" : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      className={`relative touch-pan-y ${dragging ? "select-none" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      <div
        className="relative"
        style={{
          transform: `translate3d(${offsetX}px, 0, 0) rotate(${rotation}deg)`,
          transition,
          willChange: dragging || exiting ? "transform" : undefined
        }}
      >
        {children}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[16px]">
          <span
            className="absolute left-4 top-4 -rotate-6 rounded-xl border-2 border-success bg-success-surface px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-success shadow-sm"
            style={{ opacity: offsetX > 0 ? progress : 0 }}
          >
            LƯU
          </span>
          <span
            className="absolute right-4 top-4 rotate-6 rounded-xl border-2 border-danger bg-danger-surface px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-danger shadow-sm"
            style={{ opacity: offsetX < 0 ? progress : 0 }}
          >
            BỎ QUA
          </span>
        </div>
      </div>
    </div>
  );
}
