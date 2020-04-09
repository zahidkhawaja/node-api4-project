require("dotenv").config();
const server = require("./server");

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n Server running on http://localhost:${port} \n`);
});