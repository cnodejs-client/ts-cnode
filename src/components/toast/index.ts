import Vue from "vue";
import type from "@/utils/type";
import VueToast from "./toast.vue";

const NToast = Vue.extend(VueToast);
const el = document.createElement("div");

type position = "center" | "top";
interface IToast {
  loading(message: string): void;
  show(data: ToastData): void;
  hide(): void;
  clearAll(): void;
}

interface ToastData {
  message?: string;
  duration?: number;
  show?: boolean;
  icon?: string;
  position?: position;
}
const parseOptions = (message: any) =>
  type.isObject(message) ? message : { message };

class Toast implements IToast {
  private queue: Array<any> = [];
  private createToast(data: ToastData | string) {
    let propsData = parseOptions(data);
    let toast = new NToast({ el, propsData });
    //@ts-ignore
    document.body.appendChild(toast.$el);
    this.queue.push(toast);
    return this.queue[this.queue.length - 1];
  }
  show(data: ToastData | string) {
    return this.createToast(data);
  }
  hide(): void {
    this.queue[this.queue.length - 1].show = false;
    this.queue.pop();
  }
  clearAll(): void {
    this.queue.map(toast => (toast.show = false));
    this.queue = [];
  }
  loading(message: string) {
    return this.createToast({ icon: "loading", message, duration: 0 });
  }
}

export const toast = new Toast();
