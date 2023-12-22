import { createLogger, format, transports } from "winston";

// custom log display format
const customFormat = format.printf(({timestamp, level, stack, message}) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`
})

const options = {
  file: {
    filename: 'error.log',
    level: 'error'
  },
  console: {
    level: 'silly'
  }
}

const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({stack: true}),
    format.json()
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'combine.log',
      level: 'info'
    })
  ]
}

// export log instance based on the current environment
export const instance = createLogger(devLogger)
