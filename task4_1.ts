// Определение перечисления LogLevel
enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

// Функция для логирования сообщений
function logMessage(message: string, level: LogLevel): void {
  const timestamp = new Date().toISOString(); // Текущая дата и время
  console.log(`[${timestamp}] [${level}] ${message}`);
}

// Примеры использования
logMessage("This is a debug message", LogLevel.DEBUG);
logMessage("This is an info message", LogLevel.INFO);
logMessage("This is a warning message", LogLevel.WARNING);
logMessage("This is an error message", LogLevel.ERROR);
