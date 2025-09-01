/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";

import { delay, events } from "@/libs/utils";
import { easeOut } from "@/libs/easing";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>(undefined);

  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current as T | undefined;
}

interface FrozenRouterProps {
  allowNewContent?: boolean;
  children: React.ReactNode;
}

function FrozenRouter({
  allowNewContent = false,
  children,
}: FrozenRouterProps) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const path = usePathname();
  const prevPath = usePreviousValue(path);

  const shouldShowOldContent = useMemo(() => {
    if (allowNewContent) {
      return false;
    }
    return path !== prevPath && path !== undefined && prevPath !== undefined;
  }, [allowNewContent, path, prevPath]);

  return (
    <LayoutRouterContext.Provider
      value={shouldShowOldContent ? prevContext : context}
    >
      {children}
    </LayoutRouterContext.Provider>
  );
}

interface TransitionProps {
  children: React.ReactNode;
}

export function Transition({ children }: TransitionProps) {
  if (process.env.NODE_ENV == "development") {
    return <TransitionDevelopment>{children}</TransitionDevelopment>;
  } else {
    return <TransitionProduction>{children}</TransitionProduction>;
  }
}

function TransitionDevelopment({ children }: TransitionProps) {
  return <main className="content">{children}</main>;
}

function TransitionProduction({ children }: TransitionProps) {
  const [allowNewContent, setAllowNewContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const prevPath = usePreviousValue(path);

  const animateOutPage = (
    type = "default",
    prevPath: string,
    path: string
  ): Promise<void> => {
    events.emit("hidePage", prevPath);
    document.documentElement.classList.remove("visible");

    return new Promise((res) => {
      const tl = gsap.timeline({
        onComplete: () => {
          res();
        },
      });

      if (type === "default" && containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: easeOut,
        });
      }
    });
  };

  const animateInPage = (
    type = "default",
    prevPath: string,
    path: string
  ): Promise<void> => {
    events.emit("showPage", path);
    document.documentElement.classList.add("visible");

    return new Promise((res) => {
      const tl = gsap.timeline({
        onComplete: () => {
          res();
        },
      });

      if (type === "default" && containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: easeOut,
        });
      }
    });
  };

  const loadPage = (): Promise<void> => {
    return new Promise(async (res) => {
      setAllowNewContent(true);

      await delay(0.1);

      if (containerRef.current) {
        imagesLoaded(containerRef.current, { background: true }, () => res());
      } else {
        res();
      }
    });
  };

  const pageTransition = useCallback(
    async (prevPath: string, path: string): Promise<void> => {
      await animateOutPage("default", prevPath, path);

      await loadPage();

      await delay(0.1);

      await animateInPage("default", prevPath, path);

      setAllowNewContent(false);
    },
    []
  );

  useEffect(() => {
    if (path !== prevPath && path !== undefined && prevPath !== undefined) {
      pageTransition(prevPath, path);
    }
  }, [path, prevPath, pageTransition]);

  return (
    <main className="content" ref={containerRef}>
      <FrozenRouter allowNewContent={allowNewContent}>{children}</FrozenRouter>
    </main>
  );
}
