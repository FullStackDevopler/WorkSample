const CAN_CONSOLE = true

export const AppLogger = (...args) => {
    if (CAN_CONSOLE) {
        console.log(...args)
    }
}
