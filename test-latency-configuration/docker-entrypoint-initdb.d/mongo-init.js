let today = new Date();
const dbName = 'test-latency-configuration';
const db = db.getSiblingDB(dbName);
const collections = db.getCollectionNames();

db.createUser({
    user: 'test',
    pwd: 'test',
    roles: [{ role: 'root', db: 'admin' }]
});

CreateCollection(collections, db, 'users');
CreateCollection(collections, db, 'products');
CreateCollection(collections, db, 'orders');

// Índices
db.users.createIndex({ email: 1 }, { unique: true });

db.orders.createIndex({ user_id: 1 });
db.orders.createIndex({ user_id: 1, status: 1 });
db.orders.createIndex({ user_id: 1, status: 1, created_at: 1 });
db.orders.createIndex({ 'products.id': 1 });

let user = {
    _id: ObjectId(),
    name: "Teste1",
    email: "t1@email.com",
    phone: "+55 11 99999-9999",
    address: {
        street: "Rua Exemplo, 123",
        city: "São Paulo",
        state: "SP",
        zip: "01000-000"
    },
    created_at: today
};

upsertDocument(db, "users", { _id: user._id }, user, dbName);

let prod = {
    _id: ObjectId(),
    name: "Notebook Dell 17",
    description: "I7, 12 GB ram....",
    price: 7000.00,
    category: "notebooks",
    stock: 50,
    created_at: today
};

upsertDocument(db, "products", { _id: prod._id }, prod, dbName);

let prod2 = {
    _id: ObjectId(),
    name: "Monitor LG 29",
    description: "monitor 29 polegadas",
    price: 1200.00,
    category: "monitores",
    stock: 50,
    created_at: today
};

upsertDocument(db, "products", { _id: prod2._id }, prod2, dbName);

let order = {
    _id: ObjectId(),
    user_id: user._id,
    products: [
        { id: prod._id, quantity: 2, price: 14000.00 },
        { id: prod2._id, quantity: 1, price: 1200.00 }
    ],
    total_price: 15200.00,
    status: "pending",
    created_at: today
};

upsertDocument(db, "orders", { _id: order._id }, order, dbName);

function upsertDocument(db, collection, filter, document, dbName) {
    let update = { $set: document };
    let options = { upsert: true };
    db.getSiblingDB(dbName)[collection].updateOne(filter, update, options);
}

function CreateCollection(collections, db, collectionName) {
    if (!collections.includes(collectionName)) {
        db.createCollection(collectionName);
    }
}
