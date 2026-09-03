import winston from "winston";
import vars from "./vars";

const { release_mode, logfile } = vars;

function releaseMode(release_mode: string): string {
  switch (release_mode) {
    case "dev":
      return "debug";
    case "prod":
      return "error";
    default:
      return "info";
  }
}

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp as string}] ${level}: ${message as string}`;
});

const consoleFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  colorize({ level: true }),
  logFormat,
);

const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  logFormat,
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

if (logfile) {
  transports.push(
    new winston.transports.File({
      filename: logfile,
      format: fileFormat,
    }),
  );
}

const logger = winston.createLogger({
  level: releaseMode(release_mode),
  transports,
});

export default logger;
