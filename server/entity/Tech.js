const dbContext = require("../dbcontext");
const Table = require("unloop-database-dynamo")(
    dbContext.db,
    dbContext.docClient
);

const key = "name";
exports.key = key;

exports.schema = {
    TableName: "Tech", //change
    BillingMode: "PROVISIONED",
    KeySchema: [{ AttributeName: key, KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: key, AttributeType: "S" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};

exports.initialData = [
    {
        //this will be put on my table  name= tech and count=
        name: "HTML",
        count: 0,
    },
    {
        name: "DOM",
        count: 0,
    },
    {
        name: "JQuery",
        count: 0,
    },
    {
        name: "Angular",
        count: 0,
    },
];

exports.table = new Table(this);
