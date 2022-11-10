import { addColors, createLogger, format, transports } from 'winston'

const { colorize, combine, json, errors, printf, timestamp } = format
const { Console, File } = transports

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'warn'
const silent = process.env.NODE_ENV === 'test'

addColors(colors)

const logger = createLogger({
  level,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  transports: [
    new Console({
      format: combine(
        printf(({ level, message, stack, timestamp }) => {
          let print = level

          if (typeof timestamp === 'string' && typeof message === 'string')
            print = `${level} ${timestamp} ${message}`

          if (
            typeof stack === 'string' &&
            stack !== '' &&
            process.env.NODE_ENV !== 'production'
          )
            print = `${print} ${stack}`

          return print
        }),
        colorize({ all: true }),
      ),
      silent,
    }),
    new File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(errors(), json()),
    }),
    new File({ filename: 'logs/all.log', format: combine(errors(), json()) }),
  ],
})

export { logger }
