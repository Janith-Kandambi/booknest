export function buildHealthPayload() {
  return {
    status: 'ok',
    service: 'booknest-server',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
}
