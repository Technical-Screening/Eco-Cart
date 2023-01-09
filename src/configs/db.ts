import { awsConfig } from "./index";
import AWS from "aws-sdk";

AWS.config.update(awsConfig);

export const docClient =  new AWS.DynamoDB.DocumentClient({"endpoint": process.env.NW_AWS_DYNAMODB_ENDPOINT});