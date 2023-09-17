import connect from '../config/amqp'
const LogHandler = async (data: string) => {
  const channel = (await connect()).createChannel();
  (await channel).assertExchange('x-logs', 'fanout');
  (await channel).assertQueue('q-logs');
  (await channel).sendToQueue('q-logs', Buffer.from(data));
  (await channel).close();
  (await connect()).close();
}

export default LogHandler;