# Serverless Architecture Demo
This is a demo of creating a serverless architecture with AWS. In order 
to use this to its fullest, you need an AWS account. Please go [here](http://blog.rackspace.com/part-1-building-server-less-architecture-aws/) 
to follow along in this series.

### Technologies used or to be used
1. AWS S3
2. AWS Cognito User Pools
3. AWS Cognito Fedrated Identities
4. AWS Lambda
5. AWS DynamoDB
6. Aurelia.io
7. Node

### Prerequisites
1. Node 4+
2. NPM 3+
3. AWS Account

### Setup
1. Clone this repo locally
2. `cd reponame`
3. `npm install`
4. `npm run dev`

### Branches
simple - example of simple login using Cognito User Pools
federated - combines simple login with Cognito Identity Pools to create a federated login with access to AWS
