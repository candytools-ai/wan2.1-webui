import { Message } from "ai";
import { useEffect, useRef, RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement>(messages: Array<Message>): [
  RefObject<T>,
  RefObject<T>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const end = endRef.current;

  //   if (container && end) {
  //     const observer = new MutationObserver(() => {
  //       end.scrollIntoView({ behavior: "instant", block: "end" });
  //     });

  //     observer.observe(container, {
  //       childList: true,
  //       subtree: false,
  //       attributes: true,
  //       characterData: true,
  //     });

  //     return () => observer.disconnect();
  //   }
  // }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return [containerRef, endRef];
}
