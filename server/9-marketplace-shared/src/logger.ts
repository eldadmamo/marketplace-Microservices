import { request } from 'express';
import winston , {log, Logger} from 'winston';
import { ElasticsearchTransformer, ElasticsearchTransport, LogData, TransformedData } from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData)
}

export const winstonLogger = (elasticsearchNode: string, name: string, level: string) => {
    const options = {
        console:{
            level,
            handleExceptions: true,
            json: false,
            colorize: true,
        },
        elasticsearch: {
            level,
            clientOpts: { 
                node: elasticsearchNode,
                log: level ,
                maxRetries: 2,
                requestTimeout: 10000,
                sniffOnStart: false,
            },
            transformer: esTransformer,
        }
    };  
    const estransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
    const logger: Logger = winston.createLogger({
        exitOnError: false,
        defaultMeta: { service: name },
        transports: [
            new winston.transports.Console(options.console),
            estransport
        ]
    });
    return logger;
}