export class Environments {
  static readonly NODE_ENV = process.env['NODE' + '_ENV'];
  static readonly PORT = process.env['PORT'];

  static readonly RMQ_USE_LOCAL = process.env['RMQ_USE_LOCAL'] === '1';
  static readonly RMQ_PROTOCOL = Environments.RMQ_USE_LOCAL ? 'amqp' : 'amqps';
  static readonly RMQ_URI = `${Environments.RMQ_PROTOCOL}://${process.env['RMQ_USERNAME']}:${process.env['RMQ_PASSWORD']}@${process.env['RMQ_URL']}`;
  static readonly RMQ_QUEUE = process.env['RMQ_QUEUE'];
  static readonly RMQ_NAME = process.env['RMQ_NAME'];
  static readonly DB_HOST = process.env['DB_HOST'] || 'localhost';
  static readonly DB_PORT = Number(process.env['MYSQL_PORT']) || 3306;
  static readonly DB_USER = process.env['DB_USER'] || '';
  static readonly DB_PASSWORD = process.env['DB_PASSWORD'] || '';
  static readonly DB_NAME = process.env['DB_NAME'] || '';
}
