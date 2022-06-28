process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let testItem = { name: "icecream", price: 3.00 };

beforeEach(async function(){
  items.push(testItem);
});

afterEach(async function() {
  items = [];
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
      expect.arrayContaining(testItem);
    });
  });

describe("POST /items", function () {
    test("Creates a new item", async function () {
        let cheese = {name: "Cheese", price: 4.95}
        const resp = await request(app).post(`/items`).send(cheese);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"added": {"newItem": {"name": "Cheese", "price": 4.95}}});
    });
});

describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
      const resp = await request(app).get(`/items/${testItem.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({items: testItem});
    });
  
    test("Responds with 404 if can't find item", async function () {
      const resp = await request(app).get(`/items/9`);
      expect(resp.statusCode).toBe(404);
    });
});

describe("Patch /items/:name", function () {
    test("Updating an item's name and price", async function () {
        const resp = await request(app).get(`/items/${testItem.name}`).send({ name: "coldcream", price: 3.99});
        expect(resp.statusCode).toBe(200);
        expect.arrayContaining({name:"coldcream", price: 3.99});
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes an item", async function() {
      const resp = await request(app).delete(`/items/${testItem.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ msg: "Deleted" });
    });
  });