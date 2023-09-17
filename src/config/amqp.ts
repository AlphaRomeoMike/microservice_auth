import * as amqplib from 'amqplib';
import config from '.';


const connect = async () => {
  return await amqplib.connect(config.AMQP_URL!);
}

export default connect;