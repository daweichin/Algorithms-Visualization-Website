// type EventHandler = (payload: any) => void

// interface EventBus {
//   on(key: string, handler: EventHandler): () => void
//   off(key: string, handler: EventHandler): void
//   emit(key: string, ...payload: Parameters<EventHandler>): void
//   once(key: string, handler: EventHandler): void
// }

// type Bus = Record<string, EventHandler[]>

// export function eventbus(config?: {
//     // error handler for later
//     onError: (...params: any[]) => void
//   }): EventBus {
//     const bus: Bus = {}
//     const on: EventBus['on'] = (key, handler) => {
//       if (bus[key] === undefined) {
//         bus[key] = []
//       }
//       bus[key]?.push(handler)
//       // unsubscribe function
//       return () => {
//         off(key, handler)
//       }
//     }
//     return { on }
//     const off: EventBus['off'] = (key, handler) => {
//         const index = bus[key]?.indexOf(handler) ?? -1
//         bus[key]?.splice(index >>> 0, 1)
//       }
//   }

  